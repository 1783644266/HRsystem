<template>
  <div class="dashboard-container" v-loading="loading">
    <div class="app-container">
      <el-card class="tree-card">
        <treeTool :data="company" :need="false" @addDepartment="showDialog" />
        <el-tree :data="data" :expand-on-click-node="false" >
          <treeTool
            slot-scope="{ data }"
            :data="data"
            @hasdeleted="getDepartments"
            @addDepartment="showDialog"
            @editDepartment="editDepartment"/>
        </el-tree>    
      </el-card> 
    </div>
    <addDepartment
      ref="addDepartment"
      :select="select" :dialog-visible.sync="dialogVisible"
      @addNew="getDepartments"/>
  </div>
</template>

<script >
import treeTool from '@/components/tree-tool'
import addDepartment from '@/components/addDepartment'
import { getDepartments } from '@/api/department'
import { array2Tree } from '@/utils/index' //变换数据格式

export default {
  created() {
    this.getDepartments()
  },
  data() {
    return {
      company: {
        name: '公司（仿）',
        manager: '负责人',
        id: '',
      },
      data: [
      ],
      dialogVisible: false,
      select: {},
      loading: false,
    }
  },
  methods: {
    async getDepartments() {
      this.loading = true
      const res = await getDepartments()
      this.data = array2Tree(res.depts, '')
      this.loading = false
    },
    showDialog(data) {
      data.type = 'add';
      this.select = {...data};
      this.dialogVisible = true
    },//接收tree组件新增子部门要求
    editDepartment(data) {
      data.type = 'edit';
      this.select = {...data};
      this.$refs.addDepartment.getDepartmentInfo(data.id)
      this.dialogVisible = true
    },//接收tree组件新增子部门要求
  },
  components: {
    treeTool,
    addDepartment
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  height: calc(100vh - 50px);
  .app-container {
    height: 100%;
    .tree-card {
      height: 100%;
      padding: 30px  140px;
      font-size:14px;
      overflow: auto;
    }
  }
}




</style>