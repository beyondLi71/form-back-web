<template>
  <div class="buleTable">
    <el-table ref="multipleTable"
              :data="data"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="内容标题"></el-table-column>
      <el-table-column prop="contentTypeText" label="内容类型"></el-table-column>
      <el-table-column prop="typeText" label="内容状态"></el-table-column>
      <el-table-column prop="isTopText" label="是否置顶"></el-table-column>
      <el-table-column prop="createTime" label="发布时间"></el-table-column>
      <el-table-column prop="createBy" label="发布人"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button @click="onDoAddInterface(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="onTopContent(scope.row.id, 'YES')" type="text" size="small">置顶</el-button>
          <el-button @click="onTopContent(scope.row.id, 'NO')" type="text" size="small" style="color: red;">取消置顶</el-button>
          <el-button @click="onDeteleContent(scope.row.id)" type="text" size="small" style="color: red;">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    onTopContent: Function,
    onDeteleContent: Function
  },
  data () {
    return {
      data: [{
        id: 1,
        title: '表单管理系统1',
        contentTypeText: '房地产',
        typeText: '已发布',
        isTopText: '已置顶',
        createTime: '2018-04-27 11:06:08',
        createBy: 'admin'
      },{
        id: 2,
        title: '表单管理系统2',
        contentTypeText: '房地产',
        typeText: '待发布',
        isTopText: '未置顶',
        createTime: '2018-04-27 11:06:08',
        createBy: 'admin'
      },{
        id: 3,
        title: '表单管理系统3',
        contentTypeText: '房地产',
        typeText: '已发布',
        isTopText: '已置顶',
        createTime: '2018-04-27 11:06:08',
        createBy: 'admin'
      }]
    }
  },
  methods: {
    handleSelectionChange(val) {
      let ids = []
      val.forEach(item => {
        ids.push(item.id)
      })
      // this.onSelectData(ids)
    }
  }
}
</script>

