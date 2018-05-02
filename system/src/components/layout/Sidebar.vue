<template>
	<el-menu class="el-menu-vertical-demo" :unique-opened="uniqueOpened">
		<el-submenu :index="toString(indexs)" v-for="(items ,indexs) in navData" :key="indexs">
			<template slot="title">
				<i class="el-icon-menu"></i>
				<span>{{items.name}}</span>
			</template>
			<el-menu-item-group>
				<el-menu-item v-for="(item ,index) in items.authFunctionVOChild" :key="index" :index="indexs+'-'+(index+1)">
          <span @click="go(item.url)">{{item.name}}</span>
				</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
	</el-menu>
</template>

<script>
import api from '@/api/api'
import configManage from '../../router/configManage'
import interfaceManage from '../../router/interfaceManage'

export default {
  data () {
    return {
      uniqueOpened: true,
			list: [],
			navData:[]
    }
  },
  created () {
		this.setNavList()
    api.configPower.getData('/account/info/getloginuserfunction',{}).then((res) => {
			if( res.data.code != '0' ){
        this.$emit('goLogin')
				this.$message.error(res.data.msg);
			}else{
        this.navData = res.data.data.authFunctionVOList;
			}
    })


  },
  methods: {
    toString (index) {
      return index.toString()
    },
    setNavList () {
      let arr = [{name: '表单管理',arr: [...configManage]},{name: '接口管理',arr: [...interfaceManage]}]
      this.list = arr
    },
    go (path) {
      console.log(path)
      this.$router.push({ path: path })
    }
  }
}
</script>
<style scoped>
.el-menu-vertical-demo{
	height: 100%;
	overflow: auto;
}
.el-aside {
  border-right: solid 1px #e6e6e6
}
.el-menu {
  border-right: none;
  overflow-x: hidden;
}
.is-opened .el-submenu__title,
.is-opened .el-icon-menu,
.is-opened .el-icon-arrow-down {
  color: #3e94e1;
}
.el-submenu__title {
  height: 48px;
  line-height: 48px;
}
.el-submenu__title,
.el-submenu.is-active .el-submenu__title {
  border-bottom: 1px solid #d5d5d5;
}
.el-menu-item-group__title {
  padding: 0;
}
.el-menu-item-group ul {
  border-bottom: 1px solid #d5d5d5;
}
.el-submenu .el-menu-item {
  padding: 0!important;
  height: 44px;
  line-height: 44px;
}
.el-menu-item span {
  display: block;
  padding-left: 40px;
}
.el-menu-item.is-active a {
    color: #409eff;
}
</style>
