<template>
	<div class="container">
    <el-button-group class="btnBox">
      <el-button size="small" type="primary" @click="dialogFormVisible = true">新增</el-button>
      <!-- <el-button size="small" type="primary" icon="el-icon-share"></el-button> -->
      <el-button size="small" type="primary">保存</el-button>
    </el-button-group>

	<!-- <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <add-user ref="userPage" basics="角色" @addUser="pushData"></add-user>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserData">确 定</el-button>
      </span>
    </el-dialog> -->


		<el-dialog title="添加角色" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="角色名称" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色描述" :label-width="formLabelWidth">
					<el-input v-model="form.describe" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="添加成员" :label-width="formLabelWidth">
					<el-input v-model="form.staff" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="添加权限" :label-width="formLabelWidth">
					<el-input v-model="form.power" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
				<el-button size="small" type="primary" @click="dialogFormVisible = false">确 定</el-button>
			</div>
		</el-dialog>












    <div style="display:flex;">
		<el-col :span="3">
			<ul class="leftNav">
				<li 
					v-for="(item , indexs) in dataList" 
					@click="changeNav(item,indexs)"
					:key="indexs"
					:class="{'navActive' : index == indexs}"
				>
					<span>{{item.name}}</span>
				</li>
			</ul>

		</el-col>
		<el-col :span="17" class="contentBox">
			<!-- <power-form></power-form> -->
			<power-content></power-content>
		</el-col>
    </div>
  </div>
</template>

<script>
	import api from '@/api/api'
	import PowerContent from './PowerContent'
	import addUser from '@/components/power/addUser'
import index from 'vue';
	export default {
		data(){
			return{
				sideList:[],
				inputVisible: false,
				inputValue: '',
				dialogVisible: false,
				dataList:[],
				showData:{},
				index:0,
				form: {
					name: '',
					describe: '',
					staff: '',
					power: ''
					},
				dialogFormVisible: false,
				formLabelWidth: '120px'
			}
		},
		components: {
			addUser,
			PowerContent
		},
		methods: {
			handleClose(done) {
			this.$confirm('确认关闭？')
				.then(_ => {
				done();
				})
				.catch(_ => {});
			},
			changeNav(val,indexs){
				this.showData = val;
				this.index = indexs;
				this.$store.commit('changePowerNav',val);
			},
			pushData(){

			},
			addUserData(){
				this.dialogVisible = false
			}
		},
		created(){
			api.configManage.getpersonnelList('5adec319d9dae869a2a705b6/example/role').then((res) => {
				this.dataList = res.data
				//this.$store.commit('power/changePowerNav',this.dataList[0]);
			})
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

<!--
<template>
	<div>
		<el-container>
			<el-row style="text-align:right;">
				<router-link :to="{name:'PowerEdit'}">
					<el-button type="primary" icon="el-icon-edit" circle></el-button>
				</router-link>
				<router-link :to="{name:'PowerForm'}">
					<el-button type="success" icon="el-icon-check" circle></el-button>
				</router-link>
				<el-button type="danger" icon="el-icon-delete" circle></el-button>
			</el-row>
			<el-aside width="200px">
				<add-nav :navData = "sideList" :showAdd="true" ></add-nav>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import addNav from '@/components/layout/addItem';
	export default {
		data(){
			return{
				sideList:[
					{
						"name":"第1项"
					},
					{
						"name":"第2项"
					},
					{
						"name":"第3项"
					}
				]
			}
		},
		components: {
			addNav
		},
		methods: {
			
		}
	}




</script>

<style scoped>
	.el-container{
		position: relative;
	}

	.el-container>.el-row{
		position: absolute;
		right: 0;
		top: 0;
	}

	.el-main{
		padding: 10px;
	}

	.PF_nav li{
		border-top: 1px solid #f7f7f7 ;
		border-bottom: 1px solid #f7f7f7;
		text-align: center;
		padding: 10px;
		box-sizing: border-box;
	}

	.PF_nav li span{
		font-size: 14px;
		color: #666;
	}

	navActive{
		color: #409EFF;
	}
	
	.formContent{
		padding: 10px;
	}

	.tag span{
		margin-left: 8px;
	}
</style>-->