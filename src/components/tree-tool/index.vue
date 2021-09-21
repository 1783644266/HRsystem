<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
    <el-col>
      <span>{{data.name}}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{data.manager}}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown trigger="click"  @command="handleCommand">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="need" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="need" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script >
import { delDepartment } from '@/api/department'

export default {
  props: {
    data: {
      type: Object,
      require: true
    },
    need: {
      type: Boolean,
      default: true,
    }
  },
  methods: {
    handleCommand(type) {
      if(type == 'del') {
        this.$confirm('此操作将永久删除该部门, 是否继续?').then(() => {
          return delDepartment(this.data.id)
        }).then( () => {
          this.$message.success('删除成功!')
          this.$emit('hasdeleted')
        }).catch(e => {}) //防止报错
      } else if(type == 'add') {
        this.$emit('addDepartment', this.data)
      } else {
        this.$emit('editDepartment', this.data)
      }
    },
  }
}
</script>

<style scoped>
</style>