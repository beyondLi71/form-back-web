<template>
	<div id="app">
		<div v-if="showLogin">
			<login @showPage="signIn"></login>
		</div>
		<div v-else>
			<el-container class="appContent">
				<el-header>
					<navbar :navData="userData" @showLoginPage="goLogin"></navbar>
				</el-header>
				<el-container>
					<el-aside width="200px" class="leftNav">
						<sidebar @goLogin="goLogin"></sidebar>
					</el-aside>
					<el-container>
						<el-main>
							<top-tabs></top-tabs>
							<app-main class="app-main"></app-main>
						</el-main>
						<!-- <el-footer>
							<footer-bar></footer-bar>
						</el-footer> -->
					</el-container>
				</el-container>
			</el-container>
		</div>
		<div v-else>
			<login></login>
		</div>
	</div>
</template>

<script>
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import AppMain from './components/layout/AppMain'
import FooterBar from './components/layout/FooterBar'
import Login from './views/Login/Login'
import TopTabs from './components/layout/TopTabs'
import api from '@/api/api'

export default {
	data(){
		return {
			showLogin: false,
			userData:{
				userName:'',
				userID:'',
				role:''
			}
		}
	},
	components: {
		Navbar,
		Sidebar,
		AppMain,
		FooterBar,
		Login,
		TopTabs
	},
	methods: {
		checkLogin () {
			return true
		},
		signIn(val,id){ // 子组件触发登录而且成功
			this.showLogin = false;
		},
		goLogin(){  // 子组件触发退出
			this.showLogin = true;
		},
		inspectID(){ // 检查用户是否需要登录
			let state = this.getCookie(this.userData.userID);
			if( state ){
				this.userData.userName = this.getCookie('admin')
				this.showLogin = false;
			}else{
				this.showLogin = true;
			}
		}
	},
	created(){
		//this.inspectID();
	}
}
</script>

<style scoped>
#app,#app>div,
.appContent{
	height: 100%;
	width: 100%;
	overflow: hidden;
}
.appContent>section{
	flex-grow: 1;
	height: 1px;
}

.leftNav{
	box-shadow: 0px 1px 11px #ccc;
}

.el-main {
  padding: 0;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
}

.app-main{
	height: 100%;
	flex-grow: 1;
	overflow: auto;
}

</style>
