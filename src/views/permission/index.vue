<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template v-slot:after>
          <el-button type="primary" size="small" @click="addPermission(1, '0')">添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        style="margin: 10px"
        border
        row-key="id">
        <el-table-column prop="name" align="left" label="名称" />
        <el-table-column prop="code" align="center" label="标识" />
        <el-table-column prop="description" align="center" label="描述" />
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <el-button v-if="row.type == 1" type="text" @click="addPermission(2, row.id)">添加</el-button>
            <el-button type="text" @click="getPermissionDetail(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
   <el-dialog :title="title" :visible.sync="dialogVisible" @close="dialogClose">
      <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width:90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="end">
        <el-col :span="6">
          <el-button size="small" @click="dialogVisible = false">取消</el-button>
          <el-button size="small" type="primary" @click="changeInfo">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script >
import { updatePermission, addPermission, getPermissionDetail, delPermission, getPermission } from '@/api/permission'
import { array2Tree } from '@/utils'

export default {
  created() {
    this.getInfo()
  },
  data() {
    return {
      tableData: [],
      list: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '',
        pid: '',
        enVisible: '0'
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      },
      dialogVisible: false
    }
  },
  computed: {
    title() {
      return '设置权限'
    }
  },
  methods: {
    async getInfo() {
      this.tableData = array2Tree(await getPermission(), 0)
    },
    delPermission(id) {
      this.$confirm('确认删除吗？').then(async() => {
        return await delPermission(id)
      }, () => {
        this.$message.warning('已取消操作')
        return Promise.reject()
      }).then(() => {
        this.$message.success('操作成功')
        this.getInfo()
      })
    }, // 删除
    async getPermissionDetail(id) {
      this.formData = await getPermissionDetail(id)
      this.dialogVisible = true
    }, // 获取权限详情
    async changeInfo() {
      await this.$refs.perForm.validate()
      try {
        if(this.formData.id) {
          await updatePermission(this.formData)
        } else {
          await addPermission(this.formData)
        }
        this.$message.success('操作成功')
        this.dialogVisible = false
        this.getInfo()
      } catch (e) {
      }
    }, // 更改权限
    addPermission(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.dialogVisible = true
    }, // 新增权限
    dialogClose() {
      this.$refs.perForm.resetFields()
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '',
        pid: '',
        enVisible: '0'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  width: auto;
}
</style>
