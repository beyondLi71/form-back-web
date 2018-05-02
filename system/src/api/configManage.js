import client from './client.js'

class ConfigManage {

  // 获取所有的模块信息
  getModuleList () {
    return client.request('/formmanager/module/getallmodule', {}, {
      method: 'post'
    })
  }

  // 根据模块ID获取流程信息
  getProcessList (id) {
    return client.request('/formmanager/flow/getflowbymoduleid/' + id)
  }

  // 根据ID获取流程信息
  getProcessDetail (id) {
    return client.request('/formmanager/flow/getflowbyid/' + id)
  }

  // 根据流程ID，获取节点信息
  getNodeList (id) {
    return client.request('/formmanager/node/getnodebyflowid/' + id)
  }

  // 新增模块信息
  saveModule (data) {
    return client.request('/formmanager/module/savemodule', data, {
      method: 'post'
    })
  }
  
  // 修改模块信息
  updatemodulebyid (data) {
    return client.request('/formmanager/module/updatemodulebyid', data, {
      method: 'post'
    })
  }

  // 删除模块信息
  delmodulebyid (id) {
    return client.request('/formmanager/module/delmodulebyid/'+id)
  }

  // 新增流程信息
  saveflow (data) {
    return client.request('/formmanager/flow/saveflow', data, {
      method: 'post'
    })
  }

  // 修改流程信息
  updateflowbyid (data) {
    return client.request('/formmanager/flow/updateflowbyid', data, {
      method: 'post'
    })
  }

  // 删除流程信息
  delflowbyid (id) {
    return client.request('/formmanager/flow/delflowbyid/'+id)
  }

  // 保存节点信息
  savenode (data) {
    return client.request('/formmanager/node/savenode', data, {
      method: 'post'
    })
  }

  // 修改节点信息
  updatenodebyid (data) {
    return client.request('/formmanager/node/updatenodebyid', data, {
      method: 'post'
    })
  }
  
  // 删除节点信息
  delnodebyid (id) {
    return client.request('/formmanager/node/delnodebyid/'+id)
  }

  getPowerList () {
    return client.request()
  }
}

const configManage = new ConfigManage()

export default configManage ;