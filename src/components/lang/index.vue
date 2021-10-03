<template>
<el-dropdown trigger="click" @command="changeLanguage">
  <div style="width: 20px;height: 20px;color:#fff;font-size:20px;line-height:0">
    <SvgIcon iconClass="language"  />
  </div>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="zh" :disabled="'zh'=== $i18n.locale ">中文</el-dropdown-item>
    <el-dropdown-item command="en" :disabled="'en'=== $i18n.locale ">en</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
</template>

<script >
import Cookies from 'js-cookie'

export default {
  methods: {
    changeLanguage(val) {
      Cookies.set('language', val)
      this.$i18n.locale = val
    }
  }
}
</script>

<style lang='scss' scoped>
</style>