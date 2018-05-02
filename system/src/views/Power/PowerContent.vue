<template>
	<div>
		<el-header class="headerBar">
			<span class="Profile">
				<img src="http://img.netbian.com/file/2018/0418/29b05368c9d48a8105c7545dcb839cf2.jpg" alt="">
			</span>
			<ul class="myInfo">
				<li class="proName">
					{{showData.name}}
				</li>
				<li>
					<p>{{showData.describe}}</p>
				</li>
			</ul>
		</el-header>


		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="角色成员">
				<div class="tag">
					<el-tag
						:key="tag"
						v-for="tag in dynamicTags"
						closable
						:disable-transitions="false"
						@close="handleClose(tag)">
						{{tag}}
					</el-tag>
					<el-input
						class="input-new-tag"
						v-if="inputVisible"
						v-model="inputValue"
						ref="saveTagInput"
						size="small"
						@keyup.enter.native="handleInputConfirm"
						@blur="handleInputConfirm"
					>
					</el-input>
					<!-- <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button> -->
				</div>
			</el-form-item>
			<el-form-item label="已有权限">
				<div class="tag">
					<el-tag
						v-for="tag in showData.tag"
						:key="tag"
						closable
						type="success"
					>
						{{tag}}
					</el-tag>
				</div>
			</el-form-item>
			<!-- <el-form-item label="全部权限">
				<div class="tag">
					<el-tag
						v-for="tag in dataList.cityOptions"
						:key="tag.name"
						type="scsds"
					>
						{{tag}}
					</el-tag>
				</div>
			</el-form-item> -->
			<el-form-item label="活动名称">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="活动区域">
				<el-select v-model="form.region" placeholder="请选择活动区域">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="活动性质">
				<el-checkbox-group v-model="form.type">
				<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
				<el-checkbox label="地推活动" name="type"></el-checkbox>
				<el-checkbox label="线下主题活动" name="type"></el-checkbox>
				<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="特殊资源">
				<el-radio-group v-model="form.resource">
				<el-radio label="线上品牌商赞助"></el-radio>
				<el-radio label="线下场地免费"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="活动形式">
				<el-input type="textarea" v-model="form.desc"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button size="small" type="primary" @click="submitForm">提交</el-button>
				<el-button size="small" >重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import api from '@/api/api'
	import{mapState} from 'vuex'
	export default {
		data(){
			return{
				index:0,
				formName:"组织名称",
				Closable:true,
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
				],
				form: {
					name: '碧桂园开发部',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				dynamicTags: ['张三', '李四', '黄五'],
				inputVisible: false,
				inputValue: '',
				dataList:{
					powerNavList:[{
						name:'',
						powerNavList:''
					}]
				},
				navData:[],
				showData:[]
			}
		},
		methods: {
			changeName(){
				
			},
			handleClose(tag) {
				this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
			},

			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},

			handleInputConfirm() {
				let inputValue = this.inputValue;
				if (inputValue) {
					this.dynamicTags.push(inputValue);
				}
					this.inputVisible = false;
					his.inputValue = '';
			},
			editThis(){
				
			},
			getList () {
				this.$store.dispatch('power/getPowerData', {})
			},
			submitForm(){
				console.log('点击了提交')
			}
		},
		created(){
			api.configManage.getpersonnelList('5adec319d9dae869a2a705b6/example/role').then((res) => {
				this.navData = res.data ;
				this.showData = this.navData[0];
			})

		},
		computed: {
			// ...mapState({
			// 	//powerDataList: state => state.power.powerData
			// }),
			itemData(){
				return this.$store.state.powerNav;
			}
		},
		watch:{
			itemData(val){
				this.showData = val
			}
		}
	}


</script>

<style scoped>
	.el-header{
		background: transparent;
	}
	.el-tag{
		margin-right:8px; 
	}

	.headerBar{
		background: transparent;
		height:120px !important;
		padding:20px !important;
		display: flex;
		align-items: center;
	}
	.headerBar>div{
		height: 100%;
		padding: 10px;
		width: 0px;
		flex-grow: 1;
	}
	.headerBar>div>h1{
		padding-left: 8px;
		font-size: 16px;
		color: #333
	}

	.headerBar>div>.el-tag{
		margin-left: 8px;
	}

	.myInfo{
		height: 100%;
		margin-left: 20px;
		flex-grow: 1;
		width: 0;
	}

	.proName{
		height: 22px;
		box-sizing: border-box;

	}

	.myInfo li{
		font-size: 16px;
		color: #333;
	}

	.myInfo p{
		width: 100%;
		font-size: 14px;
		color: #666;
	}

	.Profile{
		display: inline-block;
		height: 80px;
		width: 80px;
		overflow: hidden;
		border-radius: 6px;
	}
	.Profile img{
		height: 100%;
		width: auto;
	}

</style>