<template>
  <div class="container smeditorBox">
    <div class="contentInfo">
      <el-form ref="form" :model="detail" label-width="120px">
        <div class="contentItem contentTitle">
          <el-input placeholder="请输入标题"
                    v-model="detail.title"
                    clearable 
                    maxlength="20">
          </el-input>
          <i class="wordLine">{{detail.title.length}}/20</i>
        </div>
        <div class="contentItem">
          <s-m-editor :config='config'></s-m-editor>
        </div>
        <el-form-item label="内容类型">
          <el-select v-model="detail.type" placeholder="请选择内容类型" clearable>
            <el-option label="金融" value="0"></el-option>
            <el-option label="房产" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否发布">
          <el-radio v-model="detail.status" label="OPEN">立即发布</el-radio>
          <el-radio v-model="detail.status" label="CLOSE">暂不发布</el-radio>
        </el-form-item>
        <el-form-item label="是否置顶">
          <el-radio v-model="detail.isTop" label="OPEN">立即置顶</el-radio>
          <el-radio v-model="detail.isTop" label="CLOSE">暂不置顶</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="isLoading" @click="onSumbit">提 交</el-button>
          <el-button :loading="isLoading" @click="showPreview">预 览</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog width="80%"
               :close-on-press-escape="true"
               :close-on-click-modal="true"
               :center="true"
               :visible.sync="isShowPreview"
               :show-close="false">
      <preview class="previewPopup"
               :content="detail.contentHtml"></preview>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showPreview">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SMEditor from '../../components/ContentManage/Smeditor/SMEditor'
import Preview from './Preview.vue'
import '../../../static/css/smeditor.css'

const config = {
  // 接口地址
  uploadUrl: 'https://jsonplaceholder.typicode.com/posts/',
  // form 里的 filename
  uploadName: 'upload_file',
  // 其他参数
  uploadParams: {},
  sticky: true,
  // 上传成功回调
  uploadCallback: (data) => {
    // console.log(data)
    return data.image.url || 'https://ws1.sinaimg.cn/large/006tNc79gy1fp1rdw7e90j30rs0rsacb.jpg'
  },
  // 上传失败回调, 可选
  uploadFailed: (err) => {
    // console.log('仅供测试, 并非真正上传')
    alert('仅供测试, 并非真正上传!', err)
  }
}
const editorElement = function () {
  return document.querySelector('.smeditor .input-area')
}

export default {
  components: {
    SMEditor,
    Preview
  },
  data () {
    return {
      detail: { // 基本信息
        title: '',
        type: '',
        isTop: '',
        status: '',
        contentHtml: ''
      },
      isLoading: false, // 提交按钮锁定
      config: config,
      isShowPreview: false, // 显示预览
    }
  },
  created () {
    let params = this.$route.params
    if (params.type) {
    } else {
		  this.$router.push({ path: '/ContentIndex/'})
    }
  },
  methods: {
    onSumbit () {
      console.log(editorElement().innerHTML)
    },
    showPreview () {
      let html = editorElement().innerHTML
      if (html !== '<p><br></p>') {
        this.isShowPreview = !this.isShowPreview
      } else {
        this.$message({
          duration: 1500,
          message: '暂无内容可预览'
        })
      }
      this.detail.contentHtml = html
      console.log(this.detail.contentHtml)
    }
  }
}
</script>
