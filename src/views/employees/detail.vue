<template>
  <div class="detail-container" >
    <div class="app-container" >
      <el-card>
        <el-tabs>
          <el-tab-pane  label="登录账户设置">
            <!-- 放置表单 -->
            <el-form class="form" ref="form" :model="info" :rules="rules" label-width="120px" style="width: 50%;">
              <el-form-item label="姓名:" prop="username" >
                <el-input v-model="info.username" style="width: 80%;" />
              </el-form-item>
              <el-form-item label="密码:" prop="password2" >
                <el-input v-model="info.password2" style="width: 80%;" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUserDetailById">更新</el-button>
                <el-button style="margin-left: 200px" @click="$router.back()">返回</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" >
            <UserInfo />
          </el-tab-pane>
          <el-tab-pane label="岗位信息" >
            <JobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script >
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import UserInfo from './components/UserInfo'
import JobInfo from './components/JobInfo'

export default {
  created() {
    this.getUserDetailById()
  },
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      info: {
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 4, max:6, message: '密码长度在4~6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getUserDetailById() {
      this.info = await getUserDetailById(this.$route.params.id)
    }, // 获取员工信息
    async saveUserDetailById() {
      try {
        await this.$refs.form.validate()
        await saveUserDetailById({...this.info, password: this.info.password2})
        this.$message.success('设置成功')
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.detail-container {
  height: calc(100vh - 50px);
  .app-container {
    height: 100%;
    .el-card {
      height: 100%;
      overflow-y: auto;
      .form {
        margin: 100px auto;
      }
    }
  }
}
</style>