<template>
  <div class="navbar" :style="{'backgroundColor': variables.menuBg}">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <div class="title">
      人力资源管理系统
    </div>
    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <div class="right-menu">
      <lang style="margin: 0 5px" />
      <el-color-picker @change="changeColor" v-model="themeColor" style="width: 20px;height: 20px;"></el-color-picker>
      <SvgIcon :iconClass="isFullscreen ?'exit-fullscreen':'fullscreen'" @click="toggleScreenFull" style="color: #fff;width: 20px;height: 20px;margin: 0 10px;" />
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-imgError="defaultImg" :src="userInfo.staffPhoto" class="user-avatar">
          <span class="name">{{userInfo.username}}</span>
          <i class="el-icon-caret-bottom" style="color:#fff"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/1783644266/HRsystem">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import variables from '@/styles/variables.scss'
import ScreenFull from 'screenfull'

export default {
  mounted() {
    this.themeColor = variables.menuBg.substr(variables.menuBg.indexOf('#'), 7)
  },
  data() {
    return {
      defaultImg: require('@/assets/common/head.jpg'), //以require引入防止因环境变化出错
      isFullscreen: false,
      themeColor: null
    }
  },
  components: {
    // Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'userInfo'
    ]),
    variables() {
      return variables
    }
  },
  methods: {
    changeColor(val) {
      document.getElementsByTagName('body')[0].style.setProperty('--testColor', val);
    }, // 变化背景颜色
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    toggleScreenFull() {
      if (!ScreenFull.isEnabled) {
        // 此时全屏不可用
        this.$message.warning('此时全屏组件不可用')
        return
      }
      ScreenFull.toggle()
      ScreenFull.on('change', () => this.isFullscreen =  ScreenFull.isFullscreen );
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  color: #fff;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .title {
    float: left;
    line-height: 50px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
    align-items: center;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 15px;
          vertical-align: middle;
        }
        .name {
          color: #fff;
          vertical-align: middle;
          margin-left:5px;
        }
        .user-dropdown {
          color: #fff;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
        }
      }
    }
  }
}
::v-deep .el-color-picker__trigger {
  width: 20px;
  height: 20px;
}
</style>
