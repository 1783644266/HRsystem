<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    @close="dialogClose">
      <el-form label-width="120px" :model="formData" :rules="rules" ref="form">
        <el-form-item label="部门名称" prop="name" >
          <el-input style="width: 80%" v-model="formData.name" placeholder="部门名称"></el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="code" >
          <el-input style="width: 80%" v-model="formData.code" placeholder="部门编码"></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager" >
          <el-select style="width: 80%" @focus="getAllEmployees" v-model="formData.manager" placeholder="部门负责人">
            <el-option
              v-for="item in employees"
              :key="item.id"
              :label="item.username"
              :value="item.username">
            </el-option>
          </el-select>          
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce" >
          <el-input style="width: 80%" v-model="formData.introduce" placeholder="部门介绍" type="textarea"></el-input>
        </el-form-item>
      </el-form>    
    <el-row slot="footer" type="flex" justify="end">
      <el-col :span="6">
        <el-button @click="$emit('update:dialogVisible', false)">取 消</el-button>
        <el-button type="primary" @click="addNew">确 定</el-button>  
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script >
import { getDepartments, addNewDepartment, editDepartment, getDepartmentInfo } from '@/api/department'
import { getAllEmployees } from '@/api/employees'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    select: {
      type: Object
    }
  },
  data() {
    var checkName = async(rule, value, callback) => {
      const {depts} = await getDepartments()
      if(this.select.type == 'edit') {
        depts.filter(e => e.pid == this.select.pid).some(e => e.name == value && e.id !== this.select.id)
        ? callback(new Error('部门名称不能重复')) : callback()
      } else {
        depts.filter(e => e.pid == this.select.id).some(e => e.name == value)
        ? callback(new Error('部门名称不能重复')) : callback()
      }

    }
    var checkCode = async(rule, value, callback) => {
      const {depts} = await getDepartments()
      if(this.select.type == 'edit') {
        depts.some(e => e.code == value && e.id !== this.select.id)? callback(new Error('部门编码不能重复')) : callback()
      } else {
        depts.some(e => e.code == value)? callback(new Error('部门编码不能重复')) : callback()
      }
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍        
      },
      rules: {
        name: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 10, message: '请输入1~10个字符', trigger: 'blur'},
          {validator: checkName, trigger: 'blur'}
        ], // 部门名称
        code: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 10, message: '请输入1~10个字符', trigger: 'blur'},
          {validator: checkCode, trigger: 'blur'}
        ], // 部门编码
        manager: [
          {required: true, message: '请输入', trigger: 'change'},
        ], // 部门管理者
        introduce: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 50, message: '请输入1~50个字符', trigger: 'blur'}
        ] // 部门介绍        
      },
      employees: [],//员工列表
      title: '',
    }
  },
  watch: {
    'select.type': {
      handler() {
        this.title = this.select.type == 'add'? '新增部门':'编辑部门'
      },
      deep: true,
    }
  },
  methods: {
    async getAllEmployees() {
      this.employees = await getAllEmployees()
    },
    addNew() {
      this.$refs.form.validate(async ok => {
        if(!ok) return
        console.log(this.select.type);
        if(this.select.type == 'edit') {
          await editDepartment(this.formData)
        } else {
          await addNewDepartment({...this.formData, pid: this.select.id})
        }
        this.$message.success('操作成功')
        this.$emit('addNew')
        this.$emit('update:dialogVisible', false)
      })
    },
    dialogClose() {
      this.$refs.form.resetFields()
      this.$emit('update:dialogVisible', false)//需要通知父组件更改变量值！！！
    },
    async getDepartmentInfo(id) {
      this.formData = await getDepartmentInfo(id)
    }

  }
}
</script>

<style scoped>
</style>