<template>
  <el-dialog title="分配角色" :visible="roleDialog" @close="closeDialog">
    <el-checkbox-group  v-model="checkList">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="end">
      <el-col :span="6">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button type="primary" size="small" @click="assignRoles">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'

export default {
  props: {
    roleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      checkList: [],
      list: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList({ pagesize: 100 })
      this.list = rows
    },
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.checkList = roleIds
    },
    async assignRoles() {
      await assignRoles({ id: this.userId, roleIds: this.checkList })
      this.$message.success('操作成功')
      this.$emit('update:roleDialog', false)
    },
    closeDialog() {
      this.$emit('update:roleDialog', false)
    }
  }
}
</script>