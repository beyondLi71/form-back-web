<template>
  <el-dialog title="新增ip白名单"
             :visible.sync="isShow"
             :close-on-click-modal="false"
             :show-close="false">
    <el-form ref="form" :model="data" label-width="150px">
      <div class="ipFormBpx">
        <el-form-item label="ip地址起始段">
          <el-input v-model="data.urlStart1" clearable></el-input>
          <el-input v-model="data.urlStart2" clearable></el-input>
        </el-form-item>
      </div>
      <div class="ipFormBpx">
        <el-form-item label="ip地址结束段">
          <el-input v-model="data.urlStart1" clearable></el-input>
          <el-input v-model="data.urlEnd" clearable></el-input>
        </el-form-item>
      </div>
      <el-form-item label="是否启用">
        <el-radio v-model="data.status" label="OPEN">启用</el-radio>
        <el-radio v-model="data.status" label="CLOSE">禁用</el-radio>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="data.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="isAddWhiteLoading" @click="onSumbit">提 交</el-button>
        <el-button :loading="isAddWhiteLoading" @click="onClose">取 消</el-button>
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
    isAddWhiteLoading: Boolean
  }
}
</script>
