<template>
  <div class="container" v-loading="loading" element-loading-text="加载中...">
    <div class="searchBoxLog">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInline.name" placeholder="接口名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="formInline.date"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          value-format="yyyy-MM-ddThh:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="searchAction">搜索</el-button>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>
    </div>
    <div class="interfaceInfo">
      <report-list :data="list"></report-list>
    </div>
    <div class="pageBox">
      <el-pagination @current-change="handleCurrentChange"
                     :current-page.sync="currentPage"
                     :page-size="pageSize"
                     layout="prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from '../../api/api'
import ReportList from '../../components/InterfaceManage/ReportList'

export default {
  components: {
    ReportList
  },
  data() {
    return {
      loading: true, // 显示loading
      currentPage: 1, // 当前页
      pageSize: 5, // 每页个数
      total: null, // 总数
      list: [], // 报表列表
      formInline: { // 搜索值
        name: '',
        date: ''
      }
    }
  },
  created () {
    this.queryinterfacestatementbykeyword(1)
  },
  methods: {
    queryinterfacestatementbykeyword (page) { // 获取报表列表
      let data = {
        p: page,
        c: this.pageSize
      }
      if (this.formInline.name) {
        data.interfaceName = this.formInline.name
      }
      if (this.formInline.date) {
        data.startTime = this.formInline.date[0]
        data.endTime = this.formInline.date[1]
      }
      this.loading = true
      this.list = []
      this.total = null
      this.currentPage = page
      api.interfaceManage.queryinterfacestatementbykeyword(data).then((response) => {
        this.loading = false
        if (response.data.code === '0') {
          let d = response.data.data.list
          this.list = d
          this.total = response.data.data.count
          this.currentPage = response.data.data.page
        } else {
          this.showTips(1500, response.data.msg, 'error')
        }
      }).catch((err) => {
        this.loading = false
        this.showTips(1500, '抱歉,暂时获取不到报表列表', 'error')
      })
    },
    handleCurrentChange (val) { // 切换分页
      this.queryinterfacestatementbykeyword(val)
    },
    searchAction () { // 搜索事件
      this.queryinterfacestatementbykeyword(1)
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

