<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select @change="dateChange" v-model="year"  size="small" style="width: 120px" >
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
         />
      </el-select>
      <el-select @change="dateChange" v-model="month" size="small" style="width: 120px;margin: 0 10px;">
        <el-option
          v-for="item in 12"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{date, data}">
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script >
export default {
  props: {
    nowDate: {
      type: Date,
      default: () => new Date()
    }
  },
  created() {
    this.year = this.nowDate.getFullYear()
    this.yearList = Array.from(Array(11), (v, i) => i + this.year - 5)
    this.month = this.nowDate.getMonth() + 1
    this.dateChange()
  },
  filters: {
    getDay(day) {
      return day.split('-')[2] > 9 ? day.split('-')[2] : day.split('-')[2].substr(1)
    }
  },
  data() {
    return {
      month: null,
      year: null,
      yearList: [],
      currentDate: null
    }
  },
  methods: {
    dateChange() {
      this.currentDate = new Date(`${this.year}-${this.month}-1`)
    },
    isWeek(day) {
      return day.getDay() == 0 || day.getDay() == 6
    }
  }
}
</script>

<style  scoped>
/deep/ .el-calendar-day {
  height:  auto;
 }
/deep/ .el-calendar-table__row td,
/deep/ .el-calendar-table tr td:first-child,
/deep/ .el-calendar-table__row td.prev,
/deep/ .el-calendar-table tr:first-child td {
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
 /deep/ .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 /deep/ .el-calendar__header {
   display: none
 }
</style>