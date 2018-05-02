<template>
	<div class="loginBox">
		<div class="loginTitle">登录</div>
		<div class="loginInfo">
			<el-form :model="rule" status-icon :rules="rules2" ref="rule" >
				<el-form-item label="账　号" prop="user">
					<el-input type="text" v-model="rule.user" auto-complete="off" placeholder="请输入帐号"></el-input>
				</el-form-item>
				<el-form-item label="密　码" prop="pwd">
					<el-input type="password" v-model="rule.pwd" auto-complete="off" placeholder="请输入密码"></el-input>
				</el-form-item>
				<!-- <el-form-item label="验证码" prop="Code" class="Code">
				<el-input type="text" v-model="rule.Code" auto-complete="off" placeholder="请输入验证码"></el-input>
				<div class="imgBox" @click="changeCode">{{NumCode}}</div>
				</el-form-item> -->
				<el-form-item class="loginBtn">
					<el-button type="primary" @click="submitForm('rule')">登录</el-button>
					<el-button @click="resetForm('rule')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	import api from '@/api/api';
  	export default {
		data() {
			var validateUser = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入账号'));
				} else {
					if (this.rule.pwd !== '') {
						this.$refs.rule.validateField('pwd');
					}
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				value === '' ? callback(new Error('请输入密码')) : callback();
			};
			var validateCode = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入验证码'));
				}else if ( value != this.NumCode ){
					callback(new Error('你输入的验证码不正确'));
				}else {
					callback();
				}
			};
			return {
				rule: {
					user: '',
					pwd: '',
					Code:''
				},
				rules2: {
					user: [{ validator: validateUser, trigger: 'blur' }],
					pwd: [{ validator: validatePass, trigger: 'blur' }],
					Code: [{ validator: validateCode, trigger: 'blur' }]
				},
				NumCode:''
			}
		},
		methods: {
			submitForm(formName) { // 点击登录按钮
				this.$refs[formName].validate((valid) => {
					if (valid) {
						api.configPower.postData('/index/login',{
							"name": this.rule.user,
							"pwd":  md5(this.rule.pwd) //MD5加密
						}).then((res) => {
							if( res.data.code != '0' ){
								this.$message.error(res.data.msg);
							}else{
								console.log(res);
								this.$emit('showPage')
							}
						})
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			changeCode(){
				var Num=""; 
				for(var i=0;i<6;i++){ 
					Num+=Math.floor(Math.random()*10); 
				}
				this.NumCode = Num;
			}
		},
		created(){
			this.changeCode()
		}
	}
</script>

<style scoped>
  .loginBox {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -171px;
    margin-top: -190px;
    width: 350px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 5px 40px 0px rgba(112, 117, 120, 0.35);
  }
  .loginTitle {
    color: #3e94e1;
    font-size: 16px;
    font-weight: bold;
    height: 46px;
    line-height: 46px;
    text-align: center;
    border-bottom: 1px solid #d5d5d5;
  }
  .loginInfo {
    padding: 20px;
  }
  .loginBtn {
    text-align: center;
  }

  .loginInfo >>> .el-form-item{
    display: flex;
    margin-bottom: 20px;
  }

  .loginInfo >>> .el-form-item__content{
    flex-grow: 1;
    width: 0;
  }

  .loginBtn>>>.el-form-item__content{
    display: flex;
    justify-content:space-between;
  }
  .loginBtn>>>.el-form-item__content .el-button{
    padding: 12px 28px;
  }
  .Code{

  }
  .Code>>> .el-form-item__content{
    display: flex;

  }

  .Code .imgBox{
    height: 100%;
    width: 140px;
    border: 1px solid #ececec;
    margin-left: 10px;
    border-radius: 4px ;
    overflow: hidden;
    text-align: center;
    color: #666;
    font-size: 14px;
    cursor: pointer;
  }
  .imgBox img{
    width: 100%;
    height: auto;
  }
</style>
