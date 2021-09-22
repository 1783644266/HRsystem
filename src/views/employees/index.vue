<template>
  <div class="setting">
    <div ref="wrapper" class="app-container">
      <pageTools :showBefore="true" ref="pageTools">
        <span slot="before">共{{total}}条记录</span>
        <template slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>        
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
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
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
            :total="total">
          </el-pagination>
        </el-row>   
      </el-card>
  
    </div>
  </div>
</template>

<script >
import { getEmployeeList } from '@/api/employees'
import employeesInfo from '@/api/constant/employees'

export default {
  created() {
    this.getEmployeeList()
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = this.$refs.wrapper.clientHeight - this.$refs.pageTools.$el.clientHeight - 160;
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
      total: 0
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
      return obj['value']
    }, //聘用形式数据转换
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