<template>
  <div class="setting-container">
    <div class="app-container" ref="container">
      <el-card >
        <el-tabs v-model="activeName" @tab-click="handleClick">

          <el-tab-pane label="用户管理" name="first">
            <el-row style="{height: 60px}">
              <el-button type="primary">新建角色</el-button>
            </el-row>
            <el-table
              :data="tableData"
              :height="tableHeight"
              style="width: 100%; margin-top: 30px">
              <el-table-column prop="companyId" align="center" label="序号"  min-width="120" contextmenu=""/>
              <el-table-column prop="name" align="center" label="角色名称"  min-width="150" />
              <el-table-column prop="description" align="center" label="描述"  min-width="200"/>
              <el-table-column align="center" label="操作"  min-width="250" >
                <template v-slot="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(row)">删除</el-button>                  
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="end" align="middle" style="height: 60px">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="query.pageNum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="query.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </el-row>            
          </el-tab-pane>

          <el-tab-pane label="配置管理" name="second">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false">
            </el-alert> 
            <el-form label-width="100px" :model="formData" >
              <el-form-item label="公司名称">
                <el-input v-model="formData.name"></el-input>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea"></el-input>
              </el-form-item>
            </el-form>                       
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script >
import { getRoleList, getCompanyInfo, delRole, getRoleInfo, editRole } from '@/api/setting'
import { mapGetters } from 'vuex'

export default {
  created() {
    this.getRoleList()
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = this.$refs.container.clientHeight -265
    })
  },
  data() {
    return {
      activeName: 'first',
      tableData: [
      ],
      tableHeight: 0,
      formData: {
        name: '',
        companyAddress: '',
        mailbox: '',
        remarks: ''
      },
      query: {
        pageSize: 1,
        pageNum: 1,
      },
      total: 0,
      roleInfo: {

      },
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    handleClick(val) {
      if(val.name == 'second') {
        this.getCompanyInfo()
      } else {
        this.getRoleList()
      }
    },
    handleCurrentChange(val) {
      this.query.pageNum = val
      this.getRoleList()
    },
    handleSizeChange(val) {
      this.query.pagesize = val
      this.getRoleList()
    },
    async getRoleList() {
      const res = await getRoleList(this.query)
      this.total = res.total
      this.tableData = res.rows
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.userInfo.companyId)
    },
    delRole(row) {
      this.$confirm(`确认删除${row.name}角色吗?`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await delRole(row.id)
      }, () => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      }).catch(() => {})
    },//删除id)角色
    async editRole(id) {
      this.roleInfo = await getRoleInfo(id)
    },//编辑角色
  }
}
</script>

<style lang="scss" scoped>
.setting-container {
  height: calc(100vh - 50px);
  .app-container {
    height: 100%;
    .el-card {
      height: 100%;
      padding: 20px;
    }
  }
}
.el-form {
  width: 50%;
  margin-top: 50px;
}
</style>