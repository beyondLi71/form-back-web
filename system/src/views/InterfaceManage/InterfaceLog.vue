<template>
  <div class="container" v-loading="loading" element-loading-text="加载中...">
    <div class="searchBoxLog">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInline.name" placeholder="接口名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.ip" placeholder="ip地址" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.state" placeholder="日志状态" clearable>
            <el-option label="正常" value="NORMAL"></el-option>
            <el-option label="异常" value="ERRO"></el-option>
          </el-select>
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
      </el-form>
    </div>
    <div class="interfaceInfo buleTable">
      <el-table :data="list" style="width: 100%" @expand-change="expandChange" border>
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="childTable" v-if="props.row.info">
              <el-table :data="props.row.info" style="width: 100%">
                <el-table-column label="方法名称" prop="methodName"></el-table-column>
                <el-table-column label="接口地址" prop="infaceUrl"></el-table-column>
                <el-table-column label="传递参数" prop="request"></el-table-column>
                <el-table-column label="返回结果" prop="response"></el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="接口名称" prop="interfaceName"></el-table-column>
        <el-table-column label="调用结果" prop="status"></el-table-column>
        <el-table-column label="调用时间" prop="startTime"></el-table-column>
        <el-table-column label="耗时(ms)" prop="time"></el-table-column>
        <el-table-column label="ip地址" prop="ip"></el-table-column>
      </el-table>
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

export default {
  data() {
    return {
      loading: true, // 显示loading
      currentPage: 1, // 当前页
      pageSize: 5, // 每页个数
      total: null, // 总数
      list: [], // 日志列表
      formInline: { // 搜索值
        name: null,
        ip: null,
        state: null,
        date: null
      },
      interfaceIds: [] // 路由传递的日志ID
    }
  },
  created () {
    this.interfaceIds = this.$route.params.id
    if (this.interfaceIds) {
      if (this.interfaceIds.length > 0) {
        this.queryinterfacemanagedetailbykeyword(1)
      } else {
		    this.$router.push({ path: '/InterfaceIndex/'})
      }
    } else {
		  this.$router.push({ path: '/InterfaceIndex/'})
    }
  },
  methods: {
    queryinterfacemanagedetailbykeyword (page) { // 获取日志列表
      let data = {
        id: this.interfaceIds[0],
        p: page,
        c: this.pageSize
      }
      if (this.formInline.name) {
        data.interfaceName = this.formInline.name
      }
      if (this.formInline.ip) {
        data.ip = this.formInline.ip
      }
      if (this.formInline.state) {
        data.status = this.formInline.state
      }
      if (this.formInline.date) {
        data.startTime = this.formInline.date[0]
        data.endTime = this.formInline.date[1]
      }
      this.list = []
      this.total = null
      this.currentPage = page
      this.loading = true
      api.interfaceManage.queryinterfacemanagedetailbykeyword(data).then((response) => {
        this.loading = false
        if (response.data.code === '0') {
          let data = []
          response.data.data.list.forEach((item, index) => {
            let status = item.status = 'NORMAL' ? '正常' : '异常'
            let temp = {
              id: item.id,
              interfaceName: item.interfaceName,
              ip: item.ip,
              startTime: item.startTime,
              status: status,
              time: item.time,
              info: [],
              index: index
            }
            data.push(temp)
          })
          this.list = data
          this.total = response.data.data.count
          this.currentPage = response.data.data.page
        } else {
          this.showTips(1500, response.data.msg, 'error')
        }
      }).catch((err) => {
        this.loading = false
        this.showTips(1500, '抱歉,暂时获取不到日志列表', 'error')
      })
    },
    searchAction() { // 搜索事件
      this.queryinterfacemanagedetailbykeyword(1)
    },
    handleCurrentChange (val) { // 切换分页
      this.queryinterfacemanageall(val)
    },
    expandChange (row) { // 展开日志详情
      this.loading = true
      api.interfaceManage.getinterfacemanagedetailbyid(row.id).then((response) => {
        this.loading = false
        if (response.data.code === '0') {
          let d = response.data.data
          this.list[row.index].info = d
        } else {
          this.showTips(1500, '抱歉,暂时获取不到日志列表', 'error')
        }
      }).catch((err) => {
        this.loading = false
        this.showTips(1500, '抱歉,暂时获取不到日志列表', 'error')
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

