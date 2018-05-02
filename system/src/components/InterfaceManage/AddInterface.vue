<template>
  <el-dialog title="新增接口"
             :visible.sync="isShow"
             :close-on-click-modal="false"
             :show-close="false">
    <el-form ref="form" :model="data" label-width="150px">
      <el-form-item label="接口名称">
        <el-input v-model="data.interfaceName" clearable></el-input>
      </el-form-item>
      <el-form-item label="方法名称">
        <el-input v-model="data.methodName" clearable></el-input>
      </el-form-item>
      <el-form-item label="接口类型">
        <el-select v-model="data.type" placeholder="请选择" clearable>
          <el-option label="HTTP" value="HTTP"></el-option>
          <el-option label="WEBSERVICE" value="WEBSERVICE"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio v-model="data.status" label="OPEN">启用</el-radio>
        <el-radio v-model="data.status" label="CLOSE">禁用</el-radio>
      </el-form-item>
      <!-- <el-form-item label="备注">
        <el-input type="textarea" v-model="data.desc"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSumbit" :loading="isAddInterfaceLoading">提 交</el-button>
        <el-button @click="onClose">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    data: Object,
    isShow: Boolean,
    onClose: Function,
    onSumbit: Function,
    isAddInterfaceLoading: Boolean
  }
}
</script>

