<template>
	<div class="container">
		<el-row>
			<el-button size="small" type="primary" @click="dialogFormVisible = true">新增</el-button>
			<el-button size="small" type="primary" @click="removeUser">删除</el-button>
			<el-button size="small" type="primary" @click="modify">修改</el-button>
		</el-row>

		<el-dialog title="新增用户" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="用户名称" :label-width="formLabelWidth">
					<el-input v-model="form.userName" auto-complete="off" placeholder="请输入用户名称"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" :label-width="formLabelWidth">
					<el-input v-model="form.userPhone" auto-complete="off" placeholder="请输入用户电话"></el-input>
				</el-form-item>
				<el-form-item label="账　　号" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off" placeholder="请输入用户账号"></el-input>
				</el-form-item>
				<el-form-item label="密　　码" :label-width="formLabelWidth">
					<el-input type="password" v-model="form.pwd" auto-complete="off" placeholder="请输入用户密码"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addUser">确 定</el-button>
			</div>
		</el-dialog>


		<el-dialog title="修改用户信息" :visible.sync="ialogFormVisible2">
			<el-form :model="form2">
				<el-form-item label="用户名称" :label-width="formLabelWidth">
					<el-input v-model="form2.userName" auto-complete="off" placeholder="请输入用户名称"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" :label-width="formLabelWidth">
					<el-input v-model="form2.userPhone" auto-complete="off" placeholder="请输入用户电话"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="ialogFormVisible2 = false">取 消</el-button>
				<el-button type="primary" @click="modifyUser">确 定</el-button>
			</div>
		</el-dialog>



		<el-dialog title="分配权限" :visible.sync="dialogFormVisible3">
			<el-form :model="form">
				<el-form-item label="已有权限" :label-width="formLabelWidth">
					<el-tag
						v-for="tag in allRole"
						v-if="tag.checked"
						:key="tag.name"
						type="success"
					>{{tag.name}}</el-tag>
				</el-form-item>
				<el-form-item label="添加添加" :label-width="formLabelWidth">
					<el-checkbox 
						:label="item.name"
						v-for="(item,index) in allRole"
						:key="index"
						v-model="item.checked"
					></el-checkbox>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible3 = false">取 消</el-button>
				<el-button type="primary" @click="allotUser">确 定</el-button>
			</div>
		</el-dialog>




		<el-table 
			ref="multipleTable"
			:data="tableData"
			tooltip-effect="dark"
			style="width: 100%"
			@selection-change="handleSelectionChange"
		>
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column
				type="index"
				:index="indexMethod"
			>
			</el-table-column>
			<el-table-column 
				prop="userName"
				label="用户名称"
			>
			</el-table-column>
			<el-table-column 
				prop="userPhone"
				label="创建时间"
			>
			</el-table-column>
			<el-table-column 
				prop="userPhone"
				label="用户联系电话"
			>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="addStaff(scope.$index, scope.row)">分配角色</el-button>
				</template>
			</el-table-column>
		</el-table>
  	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		data(){
			return {
        		allRole:[],
        		roleList:[],
				tableData:[{
					userName: '',
					userPhone:'',
					createTime:'',
					id:''
				}],
				form2:{
					userName: '',
					userPhone: ''
				},
				form: {
					userName: '',
					userPhone: '',
					name:'',
					pwd:''
				},
				formLabelWidth: '120px',
				dialogFormVisible: false,
				ialogFormVisible2: false,
				dialogFormVisible3:false,
				onSelectData:[],
				itemId:'',
				checkList:[],
				itemData:{}  // 当前数据
      		}
		},
		components: {

		},
		methods: {
			getData(){
				api.configPower.getLogin('/identity/user/getuserinfolist',{}).then((res) => {
					this.tableData = res.data.data.list;
				})
			},
			handleSelectionChange(val) {
				this.onSelectData = val
			},
			addUser(){ // 添加用户
				api.configPower.postData('/identity/user/adduserinfo',{
					"authUserInfoDTO": {
						"userName": this.form.userName,
						"userPhone": this.form.userPhone
					},
					"authUserLoginDTO": {
						"name": this.form.name,
						"pwd": this.form.pwd
					}
				}).then((res)=>{
					if(res.data.code != 0){
						this.$message.error(res.data.msg);
					}else{
						this.getData();
						this.dialogFormVisible = false
					}
				})
			},
			removeUser(){  // 删除数据
				api.configPower.deleteData('/identity/user/deleteuserinforbyid',{
					"id": this.onSelectData[0].id
				}).then((res)=>{
					if(res.data.code != 0){
						this.$message.error(res.data.msg);
					}else{
						this.getData()
					}
				})
			},
			modify(){ // 修改用户
				if( !this.onSelectData[0]){
					this.$message.error('请选择用户');
					return;
				};
				this.ialogFormVisible2 = true;
				this.form2 = this.onSelectData[0];
				api.configPower.getData('/identity/user/getuserinfobyid/'+this.onSelectData[0].id).then((res)=>{
					if(res.data.code != 0){
						this.$message.error(res.data.msg);
					}else{
						this.itemId = res.data.data.id;
					}
				})
			},
			modifyUser(){  // 确定修改
				api.configPower.putData('/identity/user/updateuserinfobyid',{
					"id": this.itemId,
					"userName": this.form2.userName,
					"userPhone": this.form2.userPhone
				}).then((res)=>{
					if(res.data.code != 0){
						this.$message.error(res.data.msg);
					}else{
						this.getData()
						this.ialogFormVisible2 = false;
					}
				})
			},
			addStaff(index, row){ // 添加人员
				this.dialogFormVisible3 = true;
				api.configPower.postData('/identity/role/getechoroleandall',{
					"userId": row.userId
				}).then((res)=>{
					if(res.data.code != 0){
						this.$message.error(res.data.msg);
					}else{

						let authRole = res.data.data.authRoleEchoVO,
							EchoVO = res.data.data.authRoleVO;
						for( var i = 0 ; i <EchoVO.length ; i++ ){
							for( var j = 0 ; j < authRole.length ; j++ ){
								if( EchoVO[i].id == authRole[j].id ){
									EchoVO[i].checked = true;
									break;
								}else{
									EchoVO[i].checked = false;
								}			
							}
						}
						this.roleList = authRole;
						this.allRole = EchoVO;
						this.itemData = row;
					}
				})
			},
			allotUser(){
				var arr = [];
				this.allRole.filter((item)=>{
					if(item.checked == true){
						arr.push(item.id)
						return item.id;
					}
				});
				api.configPower.putData('/identity/user/assignrole',{
					"roleIds": arr,
					'userId': this.itemData.userId
				}).then((res)=>{
					if(res.data.code != 0){
						this.$message.error(res.data.msg);
					}else{
						this.dialogFormVisible3 = false;
					}
				});
			},
			indexMethod(index) {
				return index;
			}
		},
		created(){
			this.getData();
		}
	}




</script>

<style scoped>

.btnBox{
	padding: 8px;
	width: 100%;
	border-bottom: 1px solid #ececec;
}

.leftNav{
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.leftNav li{
	box-sizing: border-box;
	padding: 8px;
	text-align: center;
	font-size: 14px;
	color: #666;
	cursor: pointer;
}
.btnBox button{
  margin-right: 8px !important;
  border-radius: 4px !important;
}

.navActive{
	background: #f7f7f7;
}

.navActive span{
	color: #409EFF;
}

.create{

}

.contentBox{
	border-left: 1px solid #ececec;
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

.el-tag{
  margin-right: 8px;
}

</style>