<template>
  <div class="buleTable">
    <el-table ref="multipleTable"
              :data="data"
              tooltip-effect="dark"
              style="width: 100%" border>
      <!-- <el-table-column prop="name" label="序号"></el-table-column> -->
      <el-table-column prop="interfaceName" label="接口名称"></el-table-column>
      <el-table-column prop="type" label="访问类型"></el-table-column>
      <el-table-column prop="callingNumber" label="调用次数"></el-table-column>
      <el-table-column prop="succeeNumber" label="成功次数"></el-table-column>
      <el-table-column prop="loserNumber" label="失败次数"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  }
}
</script>

