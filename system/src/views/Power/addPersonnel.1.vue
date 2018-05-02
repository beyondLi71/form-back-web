<template>
  <div class="container">
    <el-button-group class="btnBox">
      <el-button size="small" type="primary" @click="dialogVisible = true">添加</el-button>
      <el-button size="small" type="primary">保存</el-button>
      <!-- <el-button type="primary" icon="el-icon-delete"></el-button> -->
    </el-button-group>

    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <add-user ref="userPage" :allRole="allRole" @addUser="pushData"></add-user>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserData">确 定</el-button>
      </span>
    </el-dialog>

    <div style="display:flex;">
    <el-col :span="4">
      <el-menu>
        <el-submenu index="1">
          <span slot="title">用户列表</span>
          <el-menu-item
            :default-active="index"
            :index="'1-'+num"
            v-for="(item ,num) in Data"
            @click="showItem(item,num)"
            :key="num"
            :class="{'is-active' : num == index }"
          >{{item.userName}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
    <div class="personnelForm">
      <el-form ref="form" :model="showData" label-width="80px">
        <el-form-item label="用户名称">
          <el-input v-model="showData.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户电话">
          <el-input v-model="showData.userPhone" clearable></el-input>
        </el-form-item>
        <el-form-item label="追加角色">
          <el-select v-model="showData.checkRole" placeholder="请选择活动区域">
            <el-option 
              :value="item.name"
              :label="item.name"
              v-for="(item , index) in allRole"  
            ></el-option>
          </el-select>
          <el-button :plain="true" size="small" type="primary" @click="addRole">追加</el-button>
        </el-form-item>
        <el-form-item label="所在角色">
          <el-tag
            :key="index"
            v-for="(item , index) in showData.role" 
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{item}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="创建时间" class="create">
          <span>{{showData.createTime}}</span>
        </el-form-item>
        <el-form-item label="创  建  人"  class="create">
          <span>{{showData.createBy}}</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit">修改</el-button>
          <el-button @click="delData(showData.userName)" size="small">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    </div>
  </div>

</template>
<script>
import api from '@/api/api'
import addUser from '@/components/power/addUser'
  export default {
    data() {
      return {
        Data:{},
        showData:{
          userName:'',
          userPhone:'',
          role:[],
          createTime:'',
          createBy:'',
          checkRole:''
        },
        inputVisible: false,
        inputValue: '',
        dialogVisible: false,
        index:'0',
        roleData:[],
        allRole:[]
      }
    },
    components:{
      addUser
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },

      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      showItem(val,num){
        this.index = num;
        this.showData = val
      },
      delData(item) {
        Array.prototype.indexOf = function(val) {
          for (var i = 0; i < this.length; i++) {
           if (this[i].userName == val) return i;
          }
          return -1;
        }
        let aaa = this.Data.indexOf(item)
        this.Data.splice(aaa,1)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      addUserData(){
        this.$refs.userPage.pushMsg();
      },
      pushData(val){
        console.log(val)
        if( val.userName == ''){
          this.$message.error('用户名称不能为空');
          return
        }

        this.Data.push(val)
        this.dialogVisible = false;
      },
      addRole(){ // 添加角色
        if( this.filterRole(this.showData.checkRole) ){
          this.$message.error('用户已在该角色');
          return false;
        }
        this.showData.role.push(this.showData.checkRole);
      },
      filterRole(val){ 
        let bb = ''
        for(var i = 0 ; i < this.showData.role.length ; i++){
          if( this.showData.role[i] == val ){
              bb = true;
          }
        }
        return bb;
      }

    },
    created(){
      api.configManage.getpersonnelList('5adec319d9dae869a2a705b6/example/mock').then((res) => {
        this.Data = res.data ;
        this.showData = res.data[0];
      });
      api.configManage.getpersonnelList('5adec319d9dae869a2a705b6/example/role').then((res) => {
        this.roleData = res.data ;
      });

      api.configManage.getpersonnelList('5adec319d9dae869a2a705b6/example/roleList').then((res) => {
        this.allRole = res.data ;
        console.log(this.allRole)
      });
		}
  }
</script>
<style scoped>
.contenBox{
  display: flex;
}
.personnelForm{
  width: 0;
  flex-grow: 1;
  padding-top: 8px;
  border-left: 1px solid #ececec;
}
.personnelForm form{
  width: 90%;
}

.btnBox{
  width: 100%;
  padding: 8px;
  border-bottom: 1px solid #ececec;
}

.btnBox button{
  margin-right: 8px !important;
  border-radius: 4px !important;
}

.create span{
  color: #606266
}

.create >>> .el-input__inner,
.create >>> .el-input__inner:hover {
  border:none; 
}

.create > div{

}

.el-menu,
.el-menu>>>.el-menu{
  background: transparent
}

.el-menu{
  border-right: none;
}

.el-tag{
  margin-right: 8px;
}

</style>


