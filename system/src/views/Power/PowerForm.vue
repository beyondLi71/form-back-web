<template>
	<div class="container">
		<el-row>
			<el-button size="small" type="primary" @click="dialogFormVisible = true">新增</el-button>
			<el-button size="small" type="primary" @click="removeRole">删除</el-button>
			<el-button size="small" type="primary" @click="modify">修改</el-button>
		</el-row>

		<el-dialog title="新增角色" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="角色名称" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off" placeholder="请输入角色名称"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addRole">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="修改用户信息" :visible.sync="ialogFormVisible2">
			<el-form :model="form2">
				<el-form-item label="用户名称" :label-width="formLabelWidth">
					<el-input v-model="form2.name" auto-complete="off" placeholder="请输入用户名称"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="ialogFormVisible2 = false">取 消</el-button>
				<el-button type="primary" @click="modifyRole">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="分配权限" :visible.sync="dialogFormVisible3">
			<el-form :model="form">
				<el-tree
					:data="data2"
					show-checkbox
					default-expand-all
					node-key="id"
					ref="tree"
					highlight-current
					:default-checked-keys="checkedKeys"
					:props="defaultProps"
					label = "name"
				>
				</el-tree>
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
				prop="name"
				label="角色名称"
			>
			</el-table-column>
			<el-table-column 
				prop="createTime"
				label="创建时间"
			>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="addPower(scope.$index, scope.row)">分配权限</el-button>
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
				tableData:[
					{
						name: '',
						createTime:''
					}
				],
				form2: {
					name: ''
				},
				form: {
					name: ''
				},
				formLabelWidth: '120px',
				dialogFormVisible: false,
				ialogFormVisible2: false,
				dialogFormVisible3:false,
				onSelectData:[],
				itemId:'',
				tags: [
						{ name: '标签一', type: '' },
						{ name: '标签二', type: 'success' },
						{ name: '标签三', type: 'info' },
						{ name: '标签四', type: 'warning' },
						{ name: '标签五', type: 'danger' }
					],
				options: [{
						value: '选项1',
						label: '黄金糕'
					}, {
						value: '选项2',
						label: '双皮奶'
					}, {
						value: '选项3',
						label: '蚵仔煎'
					}, {
						value: '选项4',
						label: '龙须面'
					}, {
						value: '选项5',
						label: '北京烤鸭'
					}],
					value: '',
					checkList1: [],
					checkList:[],
					itemData:{}, // 点击当前的数据,
					data2: [],
					defaultProps: {  // 改属性名
						children: 'authFunctionVOChild',
          				label: 'name'
					},
					checkedKeys:[]
			}
		},
		components: {
		},
		methods: {
			getData(){
				api.configPower.postData('/identity/role/getrolelist',{}).then((res) => {
					this.tableData = res.data.data.list;
				})
			},
			handleSelectionChange(val) {
				this.onSelectData = val
			},
			addRole(){ // 添加角色
				api.configPower.postData('/identity/role/addrole',{
					"name": this.form.name
				}).then((res)=>{
				if(res.data.code != 0){
					this.$message.error(res.data.msg);
				}else{
					this.getData();
					this.dialogFormVisible = false
				}
				})
			},
			removeRole(){  // 删除数据
				api.configPower.deleteData('/identity/role/deleterolebyid',{
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
				this.form2.name = this.onSelectData[0].name
				//console.log(this.onSelectData[0].name)

				api.configPower.getData('/identity/role/getRoleById/'+this.onSelectData[0].id).then((res)=>{
				if(res.data.code != 0){
					this.$message.error(res.data.msg);
				}else{
					this.itemId = res.data.data.id;
				}
				})
			},
			modifyRole(){  // 确定修改
				api.configPower.putData('/identity/role/updaterolebyid',{
				"id": this.itemId,
				"name": this.form2.name
				}).then((res)=>{
				if(res.data.code != 0){
					this.$message.error(res.data.msg);
				}else{
					this.getData()
					this.ialogFormVisible2 = false;
				}
				})
			},
			addPower(index, row) { // 添加权限
				this.dialogFormVisible3 = true;
				this.itemData = row;
				api.configPower.postData('/identity/function/getallfunctionforassignuser',{
					"roleId": this.itemData.id
				}).then((res)=>{
					console.log(res)
					if(res.data.code != 0){
						this.$message.error(res.data.msg);
					}else{
						this.checkedKeys = [];
						let user = res.data.data.userfucntions;
						this.data2 = res.data.data.allFunctions;
						for( var j= 0 ; j<user.length ; j++ ) {
							this.checkedKeys.push(user[j].id);
						}
					}
				})
			},
			allotUser(){
				let arr = this.$refs.tree.getCheckedKeys()
				api.configPower.postData('/identity/role/assignfunction',{
					"functionIds": arr,
					"roleId": this.itemData.id
				}).then((res)=>{
					if(res.data.code != 0){
						this.$message.error(res.data.msg);
					}else{
						this.dialogFormVisible3 = false;
						this.checkedKeys = [];
						this.getData();
					}
				})
			},
			indexMethod(index){
				return index+1;
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