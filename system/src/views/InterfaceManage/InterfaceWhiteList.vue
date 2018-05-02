<template>
  <div class="container" v-loading="loading" element-loading-text="加载中...">
    <div class="searchBox">
      <el-button type="primary" size="small" @click="doAddWhite">新增</el-button>
      <el-button type="primary" size="small" @click="doDeteleWhite" :disabled="isBtnDisabled">删除</el-button>
      <!-- <el-button size="small" @click="doOpen" :disabled="isBtnDisabled">启用</el-button>
      <el-button size="small" @click="doOpen" :disabled="isBtnDisabled">警用</el-button> -->
    </div>
    <div class="interfaceInfo">
      <white-list :on-select-data="updateSelectList"
                  :data="list"
                  :on-do-open="doOpen"
                  :on-do-detele-white="doDeteleWhite"
                  :on-do-add-white="showUpdate"></white-list>
    </div>
    <div class="pageBox">
      <el-pagination @current-change="handleCurrentChange"
                     :current-page.sync="currentPage"
                     :page-size="pageSize"
                     layout="prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>

    <add-white :data="whieDetail"
               :is-add-white-loading="isAddWhiteLoading"
               :is-show="isShowAddWhite"
               :on-sumbit="saveWhite"
               :on-close="onClose"></add-white>
  </div>
</template>

<script>
import api from '../../api/api'
import WhiteList from '../../components/InterfaceManage/WhiteList'
import AddWhite from '../../components/InterfaceManage/AddWhite'

export default {
  components: {
    WhiteList,
    AddWhite
  },
  data () {
    return {
      loading: true, // 显示loading
      currentPage: 1, // 当前页
      pageSize: 5, // 每页个数
      total: null, // 总数
      list: [], // 白名单列表
      selectionList: [], // 白名单选中列表
      isBtnDisabled: true, // 按钮是否禁用
      isAddWhiteLoading: false, // 新增白名单确认按钮锁定
      whieDetail: { // 新增白名单obj
        remark: null,
        status: null,
        urlStart: null,
        urlStart1: null,
        urlStart2: null,
        urlEnd: null
      },
      isShowAddWhite: false, // 是否显示新增白名单弹窗
    }
  },
  created () {
    this.querywhitenameall(1)
  },
  methods: {
    querywhitenameall (page) { // 获取白名单列表
      let data = {
        p: page,
        c: this.pageSize
      }
      this.loading = true
      this.list = []
      this.total = null
      this.currentPage = page
      api.interfaceManage.querywhitenameall(data).then((response) => {
        this.loading = false
        if (response.data.code === '0') {
          let d = response.data.data.list
          d.forEach((item, index) => {
            item.statusText = item.status === 'OPEN' ? '已启用' : '已禁用'
          })
          this.list = d
          this.total = response.data.data.count
          // this.currentPage = response.data.data.page
        } else {
          this.showTips(1500, response.data.msg, 'error')
        }
      }).catch((err) => {
        this.loading = false
        this.showTips(1500, '抱歉,暂时获取不到白名单列表', 'error')
      })
    },
    handleCurrentChange (val) { // 切换分页
      this.querywhitenameall(val)
    },
    updateSelectList (data) {
      this.selectionList = data
      if (data.length > 0) {
        this.isBtnDisabled = false
      } else {
        this.isBtnDisabled = true
      }
    },
    doDeteleWhite (id) { // 删除白名单
      let data
      if (this.selectionList.length > 0) {
        data = this.selectionList
      } else {
        data = [id]
      }
      this.showDeteleTips('此操作将删除选中白名单, 是否继续?', (that) => {
        api.interfaceManage.deletewhitenamebyid(data).then((response) => {
          if (response.data.data === 'success') {
            that.showTips(1500, '删除成功', 'success')
            that.querywhitenameall(1)
          } else {
            that.$message.error(response.data.msg)
          }
        }).catch(() => {
          that.showTips(1500, '抱歉，出错了', 'error')
        })
      })
    },
    doOpen (id, status) { // 启用白名单
      let str = status === 'OPEN' ? '此操作将启用选中白名单, 是否继续?' : '此操作将禁用选中白名单, 是否继续?'
      let str1 = status === 'OPEN' ? '启用成功' : '禁用成功'
      this.showDeteleTips(str, (that) => {
         api.interfaceManage.updatewhitenamebystatus(id, status).then((response) => {
          if (response.data.data === 'success') {
            that.querywhitenameall(1)
            that.showTips(1500, str1, 'success')
          } else {
            that.$message.error(response.data.msg)
          }
        }).catch(() => {
          that.showTips(1500, '抱歉，出错了', 'error')
        })
      })
    },
    doAddWhite () { // 显示新增白名单弹窗
      this.isShowAddWhite = true
      this.whieDetail = {
        remark: null,
        status: null,
        urlStart: null,
        urlStart1: null,
        urlStart2: null,
        urlEnd: null
      }
    },
    showUpdate (data) { // 显示修改白名单弹窗
      this.isShowAddWhite = true
      let urlStartArr = data.urlStart.split('.')
      let urlStart1 = urlStartArr[0] + '.' + urlStartArr[1] + '.' + urlStartArr[2]
      let d = {
        id: data.id,
        remark: data.remark,
        status: data.status,
        urlStart: data.urlStart,
        urlStart1: urlStart1,
        urlStart2: urlStartArr[3],
        urlEnd: data.urlEnd.split('.')[3],
      }
      this.whieDetail = d
    },
    saveWhite () { // 新增白名单保存
      let data = this.whieDetail
      if (!data.urlStart1 || !data.urlStart2) {
        this.showTips(1500, '请填写完整的ip地址起始段', 'warning')
        return false
      }
      if (!data.urlStart1 || !data.urlEnd) {
        this.showTips(1500, '请填写完整的ip地址结束段', 'warning')
        return false
      }
      if (data.urlStart2 > data.urlEnd) {
        this.showTips(1500, 'ip地址结束段需大于ip地址起始段', 'warning')
        return false
      }

      if (!data.remark) {
        this.showTips(1500, '备注不能为空', 'warning')
        return false
      }

      if (!data.status) {
        this.showTips(1500, '请选择是否启用', 'warning')
        return false
      }
      let urlStart = data.urlStart1 + "." + data.urlStart2
      let urlEnd = data.urlStart1 + "." + data.urlEnd
      let detail = {
        remark: data.remark,
        status: data.status,
        urlEnd: urlEnd,
        urlStart: urlStart
      }
      this.loading = true
      this.isAddWhiteLoading = true
      if (data.id) {
        detail.id = data.id
        api.interfaceManage.updatewhitenameebyid(detail).then((response) => {
          this.loading = false
          this.isAddWhiteLoading = false
          if (response.data.data === 'success') {
            this.querywhitenameall(1)
            this.isShowAddWhite = false
          } else {
            this.showTips(1500, '抱歉,出错了', 'error')
          }
        }).catch((err) => {
          this.loading = false
          this.isAddWhiteLoading = false
          this.showTips(1500, '抱歉,出错了', 'error')
        })
      } else {
        api.interfaceManage.savewhitename(detail).then((response) => {
          this.loading = false
          this.isAddWhiteLoading = false
          if (response.data.data === 'success') {
            this.querywhitenameall(1)
            this.isShowAddWhite = false
          } else {
            this.showTips(1500, '抱歉,出错了', 'error')
          }
        }).catch((err) => {
          this.loading = false
          this.isAddWhiteLoading = false
          this.showTips(1500, '抱歉,出错了', 'error')
        })
      }
    },
    onClose () { // 关闭弹窗
      this.isShowAddWhite = false
    },
    showDeteleTips (text, callback) { // 删除提示
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确认删除
        callback(this)
      }).catch(() => { // 取消删除
      })
    },
    showTips (time, msg, type) {
      this.$message({
        duration: time,
        message: msg,
        type: type
      })
    }
  }
}
</script>

