<template>
  <div class="buleTable">
    <el-table ref="multipleTable"
              :data="data"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="urlStart" label="ip地址起始段"></el-table-column>
      <el-table-column prop="urlEnd" label="ip地址结束段"></el-table-column>
      <el-table-column prop="statusText" label="是否启用"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="createBy" label="创建人"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="onDoAddWhite(scope.row)" type="text" size="small">修改</el-button>
          <el-button v-if="scope.row.status === 'CLOSE'" @click="onDoOpen(scope.row.id, 'OPEN')" type="text" size="small">启用</el-button>
          <el-button v-else @click="onDoOpen(scope.row.id, 'CLOSE')" type="text" size="small" style="color: red;">禁用</el-button>
          <el-button @click="onDoDeteleWhite(scope.row.id)" type="text" size="small" style="color: red;">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    onSelectData: Function,
    onDoOpen: Function,
    onDoClose: Function,
    onDoDeteleWhite: Function,
    onDoAddWhite: Function,
    data: Array
  },
  methods: {
    handleSelectionChange(val) {
      let ids = []
      val.forEach(item => {
        ids.push(item.id)
      });
      this.onSelectData(ids)
    }
  }
}
</script>

