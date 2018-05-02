<template>
    <div class="container">
        <el-row>
			<el-button size="small" type="primary" @click="addModularBtn">新增</el-button>
		</el-row>

            <el-dialog title="新增模板" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="模板名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否为根节点" :label-width="formLabelWidth">
                    <el-switch
                        v-model="form.accordion"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    >
                    </el-switch>
                </el-form-item>
                <el-form-item v-if="!form.accordion" label="父　　级" :label-width="formLabelWidth">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.name"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="路　　径" :label-width="formLabelWidth">
                    <el-input v-model="form.url" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addModular">确 定</el-button>
            </div>
        </el-dialog>




        <el-table :data="tableData" style="width: 100%">
            <el-table-column
				type="index"
				:index="indexMethod"
			>
			</el-table-column>
            <el-table-column
                prop="name"
                label="模块名称"
            >
            </el-table-column>
            <el-table-column
                prop="rootNode"
                label="是否为根节点"
            >
            </el-table-column>
            <el-table-column
                prop="url"
                label="url"
            >
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="创建时间"
            >
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import api from '@/api/api'
    export default {
        data() {
            return {
                tableData: [],
                dialogFormVisible:false,
                form: {
                    name: '',
                    accordion :false,
                    parentId:'',
                    url:''
                },
                formLabelWidth: '120px',
                options: [],
                value: null
            }
        },
        methods: {
            getData(){
				api.configPower.postData('/identity/function/getfunctionlist',{}).then((res) => {
                    console.log(res)
                    if( res.data.code != 0 ){
						this.$message.error(res.data.msg);
					}else{
                        this.tableData = res.data.data.list;
                        for(var i = 0 ; i < this.tableData.length ; i++){
                            if( this.tableData[i].parentId == 0 ){
                                this.tableData[i].rootNode = '是';
                                this.tableData[i].url = '/';
                            }else{
                                this.tableData[i].rootNode = '否';
                            }
                        }
                    }
                })
            },
            addModular(){
                if( this.form.name == '' ){
                    this.$message.error('请输入名称');
                    return;
                }
                if( this.value == null &&  !this.form.accordion){
                    this.$message.error('请选择父级');
                    return;
                }
                if(this.form.url == ''){
                    this.$message.error('请输入url');
                    return;
                }

                var obj = {}
                if( this.form.accordion ){
                    obj.accordion = 'YES';
                    obj.parentId = 0
                }else{
                    obj.accordion = 'NO';
                    obj.parentId = this.value
                }
                obj.url = this.form.url;
                obj.name = this.form.name;
                api.configPower.postData('/identity/function/addfunction',obj
                ).then((res) => {
                    if( res.data.code != 0 ){
						this.$message.error(res.data.msg);
					}else{
						this.getData();
					}
				})
            },
            indexMethod(index){
                return index+1;
            },
            addModularBtn(){
                this.dialogFormVisible = true;
                api.configPower.getData('/identity/function/getallparentnode',{}).then((res) => {
                    if( res.data.code != 0 ){
						this.$message.error(res.data.msg);
					}else{
                        this.options = res.data.data;
					}
                })
            }
        },
        created(){
            this.getData()
        }
    }
</script>

<style scoped>

</style>


