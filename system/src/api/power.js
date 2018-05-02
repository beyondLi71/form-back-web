import client from './client.js'

class ConfigPower {
  getPowerList (id) {
    return client.request(id)
  }

  getpersonnelList (id) {
    return client.request(id)
  }

  getLogin (id, data) {
    return client.request(id, data, {
      method: 'post'
    })
  }

  getUserGata (id, data) {
    return client.request(id)
  }

  postData (id, data) {
    return client.request(id, data, {
      method: 'post'
    })
  }

  getData (id, data) {
    return client.request(id)
  }

  deleteData (id, data) {
    return client.request(id, data, {
      method: 'delete'
    })
  }

  putData (id, data) {
    return client.request(id, data, {
      method: 'put'
    })
  }
}

const configPower = new ConfigPower()

export default configPower