import client from './client.js'

class InterfaceManage {

  // 接口配置管理分页查询显示
  queryinterfacemanageall (data) {
    return client.request('/interface/manage/queryinterfacemanageall?p='+data.p+"&c="+data.c, {}, {
      method: 'post'
    })
  }

  // 新增配置管理
  saveinterfacemanage (data) {
    return client.request('/interface/manage/saveinterfacemanage', data, {
      method: 'post'
    })
  }

  // 修改配置管理
  updateinterfacemanagebyid (data) {
    return client.request('/interface/manage/updateinterfacemanagebyid', data, {
      method: 'post'
    })
  }

  // 删除配置管理
  deleteinterfacemanagebyid (id) {
    return client.request('/interface/manage/deleteinterfacemanagebyid/'+ id)
  }

  // 接口配置启用禁用按钮
  updateinterfacemanagestatus (status, id) {
    return client.request('/interface/manage/updateinterfacemanagestatus/'+ id + '/' + status)
  }
  
  // 接口日志条件分页查询
  queryinterfacemanagedetailbykeyword (data) {
    return client.request('/interface/manage/queryinterfacemanagedetailbykeyword', data, {
      method: 'post'
    })
  }

  // 根据日志id 查询接口名称入参与出参
  getinterfacemanagedetailbyid (id) {
    return client.request('/interface/manage/getinterfacemanagedetailbyid/'+ id)
  }

  // 白名单分页显示
  querywhitenameall (data) {
    return client.request('/interface/whitename/querywhitenameall', data, {
      method: 'post'
    })
  }

  // 添加白名单数据
  savewhitename (data) {
    return client.request('/interface/whitename/savewhitename', data, {
      method: 'post'
    })
  }

  // 根据id修改白名单数据
  updatewhitenameebyid (data) {
    return client.request('/interface/whitename/updatewhitenameebyid', data, {
      method: 'post'
    })
  }

  //白名单删除
  deletewhitenamebyid (data) {
    return client.request('/interface/whitename/deletewhitenamebyid', data, {
      method: 'post'
    })
  }

  // 白名单启用禁用按钮
  updatewhitenamebystatus (status, id) {
    return client.request('/interface/whitename/updatewhitenamebystatus/'+ id + '/' + status)
  }

  // 分页条件查询接口报表
  queryinterfacestatementbykeyword (data) {
    return client.request('/interface/statement/queryinterfacestatementbykeyword', data, {
      method: 'post'
    })
  }

}

const interfaceManage = new InterfaceManage()

export default interfaceManage