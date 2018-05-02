<template>
  <div class="container" v-loading="loading" element-loading-text="加载中...">
    <div class="searchBox">
      <el-button type="primary" size="small" @click="doAddInterface(null)">新增</el-button>
      <el-button type="primary" size="small" @click="doDeteleInterface" :disabled="isBtnDisabled">删除</el-button>
      <el-button size="small" @click="goLogList('ALL')" :disabled="isBtnDisabled">查看日志</el-button>
      <div class="seachIpt">
        <el-input placeholder="请输入接口名称" v-model="searchVal" @blur="searchAction" @keyup.13.native="searchAction" clearable>
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </div>
    <div class="interfaceInfo">
      <interface-list :on-select-data="updateSelectList"
                      :data="interfaceList"
                      :on-do-open="doOpen"
                      :on-save-process="goLogList"
                      :on-do-detele-interface="doDeteleInterface"
                      :on-do-add-interface="doAddInterface"></interface-list>
    </div>
    <div class="pageBox">
      <el-pagination @current-change="handleCurrentChange"
                     :current-page.sync="currentPage"
                     :page-size="pageSize"
                     layout="prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
    <div>
      <add-interface :data="interfaceDetail"
                     :is-show="isShowAddInterface"
                     :on-sumbit="saveInterface"
                     :on-close="onClose"
                     :is-add-interface-loading="isAddInterfaceLoading"></add-interface>
    </div>
  </div>
</template>

<script>
import api from '../../api/api'
import InterfaceList from '../../components/InterfaceManage/InterfaceList'
import AddInterface from '../../components/InterfaceManage/AddInterface'
import '../../../static/css/interfaceManage.css'

export default {
  components: {
    InterfaceList,
    AddInterface
  },
  data () {
    return {
      loading: true, // 显示loading
      currentPage: 1, // 当前页
      pageSize: 5, // 每页个数
      total: null, // 总数
      searchVal: null, // 搜索值
      isBtnDisabled: true, // 按钮是否禁用
      selectionList: [], // 存放选中接口数组
      isShowAddInterface: false, // 显示新增接口弹窗
      interfaceDetail: { // 新增接口obj
        interfaceName: null,
        methodName: null,
        status: null,
        type: null
      },
      interfaceList: [], // 接口列表数组
      isAddInterfaceLoading: false, // 新增接口确认按钮锁定
    }
  },
  created () {
    this.queryinterfacemanageall(1)
  },
  methods: {
    queryinterfacemanageall (page) { // 获取接口列表
      let data = {
        p: page,
        c: this.pageSize
      }
      this.interfaceList = []
      this.total = null
      this.currentPage = page
      api.interfaceManage.queryinterfacemanageall(data).then((response) => {
        this.loading = false
        if (response.data.code === '0') {
          let d = response.data.data.list
          d.forEach((item, index) => {
            item.statusText = item.status === 'OPEN' ? '已启用' : '已禁用'
          })
          this.interfaceList = d
          this.total = response.data.data.count
          this.currentPage = response.data.data.page
        } else {
          this.showTips(1500, response.data.msg, 'error')
        }
      }).catch((err) => {
        this.loading = false
        this.showTips(1500, '系统错误，暂时获取不到接口列表', 'error')
      })
    },
    goLogList (type, id) { // 查看日志
      let ids = []
      if (type === 'ONE') { // 单独查看
        ids = [id]
      } else { // 批量查看
        ids = this.selectionList
      }
		  this.$router.push({ name: 'InterfaceLog', params: { id: ids}})
    },
    handleCurrentChange (val) { // 切换分页
      this.queryinterfacemanageall(val)
    },
    updateSelectList (data) {
      this.selectionList = data
      if (data.length > 0) {
        this.isBtnDisabled = false
      } else {
        this.isBtnDisabled = true
      }
    },
    searchAction () { // 回车搜索事件
      console.log(this.searchVal)
    },
    doDeteleInterface (id) { // 删除接口
      this.showDeteleTips('此操作将删除选中接口, 是否继续?', (that) => {
        that.loading = true
        api.interfaceManage.deleteinterfacemanagebyid(id).then((response) => {
          that.loading = false
          if (response.data.data === 'success') {
            that.queryinterfacemanageall(1)
            that.showTips(1500, '删除成功', 'success')
          } else {
            that.$message.error(response.data.msg)
          }
        }).catch(() => {
          that.loading = false
          that.showTips(1500, '抱歉，保存出错了', 'error')
        })
      })
    },
    doOpen (id, status) { // 启用or禁用接口
      let str = status === 'OPEN' ? '此操作将启用选中接口, 是否继续?' : '此操作将禁用选中接口, 是否继续?'
      let str1 = status === 'OPEN' ? '启用成功' : '禁用成功'
      this.showDeteleTips(str, (that) => {
        this.loading = true
        api.interfaceManage.updateinterfacemanagestatus(id, status).then((response) => {
          this.loading = false
          if (response.data.data === 'success') {
            that.queryinterfacemanageall(1)
            that.showTips(1500, str1, 'success')
          } else {
            that.$message.error(response.data.msg)
          }
        }).catch(() => {
          this.loading = true
          that.showTips(1500, '抱歉，出错了', 'error')
        })
      })
    },
    onClose () { // 关闭所有弹窗
      this.isShowAddInterface = false
    },
    doAddInterface (data) { // 显示新增接口弹窗
      this.isShowAddInterface = true
      if (data) {
        this.interfaceDetail = data
      } else {
        this.interfaceDetail = {
          interfaceName: null,
          methodName: null,
          status: null,
          type: null
        }
      }
    },
    saveInterface () { // 接口编辑弹窗保存
      let data = this.interfaceDetail
      if (!data.interfaceName) {
        this.showTips(1500, '接口名称不能为空', 'warning')
        return false
      }
      if (!data.methodName) {
        this.showTips(1500, '方法名称不能为空', 'warning')
        return false
      }
      if (!data.type) {
        this.showTips(1500, '请选择接口类型', 'warning')
        return false
      }
      if (!data.status) {
        this.showTips(1500, '请选择是否启用', 'warning')
        return false
      }
      if (this.isAddInterfaceLoading) {
        this.showTips(1500, '提交中,请稍等...')
        return false
      }
      this.isAddInterfaceLoading = true

      if (data.id) {
        api.interfaceManage.updateinterfacemanagebyid(data).then((response) => {
          this.isAddInterfaceLoading = false
          if (response.data.data === 'success') {
            this.isShowAddInterface = false
            this.showTips(1500, '修改成功', 'success')
            this.queryinterfacemanageall(1)
          } else {
            this.showTips(1500, '抱歉，出错了', 'error')
          }
        }).catch((err) => {
          this.isAddInterfaceLoading = false
          this.showTips(1500, '抱歉，出错了', 'error')
        })
      } else {
        api.interfaceManage.saveinterfacemanage(data).then((response) => {
          this.isAddInterfaceLoading = false
          if (response.data.data === 'success') {
            this.queryinterfacemanageall(1)
            this.showTips(1500, '创建成功', 'success')
            this.isShowAddInterface = false
          } else {
            this.showTips(1500, '抱歉，出错了', 'error')
          }
        }).catch((err) => {
          this.isAddInterfaceLoading = false
          this.showTips(1500, '抱歉，出错了', 'error')
        })
      }
    },
    showDeteleTips (text, callback) { // 删除提示
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确认删除
        callback(this)
      }).catch(() => { // 取消删除
      });
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
