<template>
  <div class="setting">
    <div ref="wrapper" class="app-container">
      <pageTools :showBefore="true" ref="pageTools">
        <span slot="before">共{{total}}条记录</span>
        <template slot="after">
          <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
          <el-button size="small" type="danger" @click="exportData">导出</el-button>
          <el-button v-if="checkPermission('POINT-USER-ADD')" size="small" type="primary" @click="dialogVisible = true">新增员工</el-button>        
        </template>
      </pageTools>
      <el-card style="margin: 0 10px;">
        <el-table
          border
          :height="tableHeight"
          :data="tableData"
          v-loading="loading"
        >
          <el-table-column align="center" type="index" label="序号" width="50" />
          <el-table-column align="center" prop="username" label="姓名" sortable />
          <el-table-column align="center"  label="头像" width="150" >
            <template v-slot="{ row }" >
              <img
                style="width: 100px; height: 100px"
                v-imgError="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                @click="showQrcode(row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="workNumber" label="工号" sortable />
          <el-table-column :formatter="formOfEmploymentFormatter" align="center" prop="formOfEmployment" label="聘用形式" sortable />
          <el-table-column align="center" prop="departmentName" label="部门" sortable />
          <el-table-column align="center" prop="timeOfEntry" label="入职时间" sortable >
            <template v-slot="{row}">
              {{row.timeOfEntry | formatDate}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="enableState" label="账户状态" sortable >
            <template v-slot="{row}">
              <el-switch :value ="row.enableState == 1"/>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" sortable fixed="right" width="280">
            <template v-slot="{row}">
              <el-button v-if="checkPermission('POINT-USER-UPDATE')" type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="showRoleDialog(row)">角色</el-button>
              <el-button v-if="checkPermission('point-user-delete')" type="text" size="small" @click="delEmployee(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" align="middle" style="height: 60px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="query.page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="query.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </el-row>
      </el-card>
    </div>
    <AddEmployee :dialogVisible.sync="dialogVisible" />
    <AssignRole :roleDialog.sync="roleDialog" :userId="userId" ref="AssignRole" />
    <el-dialog
      title="二维码"
      :visible.sync="qrcodeVisible"
      width="30%">
      <canvas style="margin: 0 auto; display: block" ref="qrcode" />
    </el-dialog>    
  </div>
</template>

<script >
import { getEmployeeList, delEmployee } from '@/api/employees'
import employeesInfo from '@/api/constant/employees'
import AddEmployee from '@/components/AddEmployee'
import { formatDate } from '@/filters'
import qrcode from 'qrcode'

export default {
  created() {
    this.getEmployeeList()
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = this.$refs.wrapper.clientHeight - this.$refs.pageTools.$el.clientHeight - 160
    })
  },
  data() {
    return {
      query: {
        size: 10,
        page: 1
      },
      tableHeight: 100,
      tableData: [
      ],
      loading: false,
      total: 0,
      dialogVisible: false,
      qrcodeVisible: false,
      roleDialog: false,
      userId: null
    }
  },
  methods: {
    async getEmployeeList() {
      this.loading = true
      const res = await getEmployeeList(this.query)
      this.total = res.total
      this.tableData = res.rows
      this.loading = false
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.getEmployeeList()
    },
    handleSizeChange(val) {
      this.query.size = val
      this.getEmployeeList()
    },
    formOfEmploymentFormatter(row, column, cellValue, index) {
      const obj = employeesInfo.hireType.find(e => e.id == cellValue)
      return obj ? obj['value'] : '未知'
    }, // 聘用形式数据转换
    async delEmployee(row) {
      try {
        await delEmployee(row.id)
        this.$message.success('删除成功')
        this.getEmployeeList()
      } catch (e) {
        console.log(e)
      }
    }, // 删除员工
    exportData() {
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async methods => {
        const { rows } = await getEmployeeList({ page: 1, size: this.total })
        const { header, data } = this.object2Array(headers, rows)
        const multiHeader = [['个人信息', '', '主要信息', '', '', '', '部门']]
        const merges = ['A1:B1', 'C1:F1', 'G1:G2']
        methods.export_json_to_excel({
          header,
          data,
          multiHeader,
          merges
        })
      })
    },
    object2Array(title, rows) {
      const header = Object.keys(title)
      const data = rows.map(item => {
        const data = []
        header.forEach(e => {
          if (title[e] == 'formOfEmployment') {
            var res = employeesInfo.hireType.find(unit => unit.id == item[title[e]])
            res ? data.push(res['value']) : data.push('未知')
          } else if (title[e] === 'timeOfEntry' || title[e] === 'correctionTime') {
            data.push(formatDate(item[title[e]]))
          } else {
            data.push(item[title[e]])
          }
        })
        return data
      })
      return { header, data }
    },
    showQrcode(url) {
      if (url) {
        this.qrcodeVisible = true
        this.$nextTick(() => {
          qrcode.toCanvas(this.$refs.qrcode, url)
        })
      } else {
        this.$message.error('该用户未上传头像')
      }
    },
    async showRoleDialog(info) {
      this.userId = info.id
      await this.$refs.AssignRole.getUserDetailById(info.id)
      this.roleDialog = true
    }
  },
  components: {
    AddEmployee
  }
}
</script>

<style lang="scss" scoped>
.setting {
  height: calc(100vh - 50px);
  .app-container {
    height: 100%;
  }
}
</style>
