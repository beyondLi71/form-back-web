<template>
    <el-form ref="form" :model="dataList" label-width="80px">
        <el-form-item label="用户名称">
            <el-input v-model="dataList.userName"  style="100px"></el-input>
        </el-form-item>
        <el-form-item label="用户电话">
            <el-input v-model="dataList.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="添加角色">
            <el-select v-model="dataList.checkRole" placeholder="请选择活动区域">
                <el-option 
                    :label="item.name"
                    :value="item.name"
                    v-for="item in allRole"
                ></el-option>
            </el-select>
            <el-button size="small" type="primary" @click="addRole">追加</el-button>
        </el-form-item>
        <el-form-item label="所在角色">
             <el-tag
                :key="tag"
                v-for="tag in dataList.role"
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
            > 
            </el-input>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    data(){
        return{
            dataList:{
                userName:'',
                userPhone:'',
                role:[],
                createTime:'',
                createBy:'',
                checkRole:''
            }
        }
    },
    methods:{
        pushMsg(){
            this.$emit('addUser',this.dataList)
        },
        addRole(){
            if( this.filterRole(this.dataList.checkRole) ){
                return this.$message.error('用户已在该角色');
            }
            this.dataList.role.push(this.dataList.checkRole)
        },
        filterRole(val){ 
            let Bl = ''
            for(var i = 0 ; i < this.dataList.role.length ; i++){
                if( this.dataList.role[i] == val ){
                    Bl = true;
                }
            }
            return Bl;
        }
    },
    props:{
        allRole:Array
    }
}
</script>
<style scoped>

</style>

