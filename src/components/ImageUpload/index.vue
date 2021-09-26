<template>
  <div>
    <el-upload
      action="#"
      :class="{has: hasImg}"
      list-type="picture-card"
      :limit="1"
      :fileList="fileList"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="onchange"
      :before-upload="beforeUpload"
      :http-request="upload">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-progress v-if="show" style="width: 148px" status="success" :stroke-width="15" :text-inside="true" :percentage="percentage" />
    <el-dialog
     :visible.sync="dialogVisible"
     title="图片预览"
     width="60%"
    >
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>

</template>

<script >
import Cos from 'cos-js-sdk-v5'
var cos = new Cos({
  SecretId: 'AKID4yd7MM6ankRs3yc097qLaaKwLWTBesrc',
  SecretKey: 'g9PSGqAF5rQjmJdmiPs77sMcdOt87qJW',  
})
export default {
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      fileList: [],
      currentUid: null,
      percentage: 0,
      show: false
    }
  },
  computed: {
    hasImg() {
      return this.fileList.length
    }
  },
  methods: {
    preview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file) {
      this.fileList.splice(this.fileList.findIndex(e => e.id == file.id), 1)
    },
    onchange(file, fileList) {
      this.fileList = fileList
    },
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      const maxSize = 10 * 1024 * 1024 // 5M以内
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      this.show = true
      this.currentUid = file.uid
    },
    upload(info) {
      cos.putObject({
        Bucket: 'img-1307598662', /* 必须 */
        Region: 'ap-nanjing', /* 存储桶所在地域，必须字段 */
        Key: info.file.name, // 文件名称 /* 必须 */
        StorageClass: 'STANDARD',
        Body: info.file, // 上传文件对象
        onProgress: (progressData) => {
          this.percentage = progressData.percent * 100
        }        
      }, (err, data) => {
        if (data.statusCode == 200) {
          this.fileList.forEach(e => {
            if (e.uid == this.currentUid) {
              e.url = `http://${data.Location}`
              e.upload = true
            }
          })
          setTimeout(() => {
            this.show = false // 隐藏进度条
            this.percentage = 0 // 进度归0
          }, 2000)
        }
      });
    }
  }
}
</script>

<style lang='scss' scoped>
  .has {
  ::v-deep  .el-upload--picture-card {
    display: none;
  }
}

.el-dialog {
  img {
    width: 100%;
  }
}
</style>