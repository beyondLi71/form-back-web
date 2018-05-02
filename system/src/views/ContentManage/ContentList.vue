<template>
  <div class="container" v-loading="loading" element-loading-text="加载中...">
    <div class="searchBoxLog">
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="请输入内容标题" v-model="searchData.searchVal" @blur="searchAction" @keyup.13.native="searchAction" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchData.type" placeholder="请选择内容类型" clearable>
            <el-option label="金融" value="0"></el-option>
            <el-option label="房产" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchData.statusText" placeholder="请选择内容状态" clearable>
            <el-option label="已发布" value="0"></el-option>
            <el-option label="未发布" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="searchAction">搜索</el-button>
        </el-form-item>
        <el-form-item>
        </el-form-item>
        <el-button type="primary" size="small" @click="goEditorContent">发布内容</el-button>
      </el-form>
    </div>
    <div class="interfaceInfo">
      <content-list :on-top-content="onTopContent"></content-list>
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
import ContentList from '../../components/ContentManage/ContentList'

export default {
  data () {
    return {
      loading: false, // 显示loading
      currentPage: 1, // 当前页
      pageSize: 5, // 每页个数
      total: null, // 总数
      isBtnDisabled: true, // 按钮是否禁用
      searchData: {
        searchVal: null,
        type: null,
        statusText: null
      }
    }
  },
  components: {
    ContentList
  },
  methods: {
    handleCurrentChange (val) { // 切换分页
      this.queryinterfacemanageall(val)
    },
    searchAction () { // 内容搜索
    },
    goEditorContent (type, id) { // 内容发布OR修改
      let params = {}
      if (type === 'ADD') { // 发布
        params = {
          type: 'ADD'
        }
      } else { // 修改
        params = {
          type: 'UPDATE',
          id: 1
        }
      }
		  this.$router.push({ name: 'ContentEditor', params: params})
    },
    onTopContent (id, type) { // 内容置顶
      let tipsStr = type === 'YES' ? '此操作将置顶选中内容, 是否继续?' : '此操作将取消置顶选中内容, 是否继续?'
      let tipsStr1 = type === 'YES' ? '置顶成功' : '取消置顶成功'
      this.showDeteleTips(tipsStr, (that) => {
        that.showTips(1500, tipsStr1, 'success')
      })
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
