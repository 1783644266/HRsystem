<template>
  <el-dialog
    title="新增员工"
    :visible="dialogVisible"
    @close="dialogClose"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" clearable />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" :maxlength="11" clearable />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择" clearable>
          <el-option
            v-for="item in employeesInfo.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber"  style="width:50%" placeholder="请输入工号" clearable />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" clearable 
          @focus="getDepartments"
        />
        <el-tree
          style="width:50%"
          v-if="showTree"
          :data="treeData"
          v-loading="loading"
          :props="{ label: 'name' }"
          @node-click="handleNodeClick">
        </el-tree>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" clearable />
      </el-form-item>
      <el-form-item label="转正时间">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" clearable />
      </el-form-item>
    </el-form>    
    <span slot="footer">
      <el-row type="flex" justify="end">
        <el-col :span="6">
          <el-button @click="$emit('update:dialogVisible', false)">取 消</el-button>
          <el-button type="primary" @click="btnOk">确 定</el-button>
        </el-col>
      </el-row>
    </span>
  </el-dialog>
</template>

<script >
import { addEmployee } from '@/api/employees'
import { getDepartments } from '@/api/department'
import { array2Tree } from '@/utils'
import employeesInfo from '@/api/constant/employees'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      treeData: [],
      loading: false,
      showTree: false,
      employeesInfo: employeesInfo
    }
  },
  methods: {
    dialogClose() {
      this.$refs.form.resetFields()
      this.formData.correctionTime = ''
      this.$emit('update:dialogVisible', false)
    },
    async getDepartments() {
      this.showTree = true
      this.loading = true
      const { depts } = await getDepartments()
      this.treeData = array2Tree(depts, '')
      this.loading = false
    },    
    async addEmployee() {
      await addEmployee(this.formData)
      this.$message.success('新增成功')
      this.dialogClose()
      this.$parent.getEmployeeList()
    },
    handleNodeClick(data) {
      this.formData.departmentName = data.name
      this.showTree = false
    }, // 当点击树形组件将name赋值给input
    btnOk() {
      this.$refs.form.validate(async ok => {
        if(!ok) return
        this.addEmployee()
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  ::v-deep .el-dialog__header{
    height: 50px;
    background-color: #66B1FF;
    span{
      color: white;
    }
  }
</style>
