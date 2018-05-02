import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)

class ApiClient {
  generateApiURI (uri) {
    return 'http://10.10.179.60:7003' + uri
  }

  request (uri, data, config) {
    if (!config) {
      return axios.get(this.generateApiURI(uri), {
        params: data
      })
    }

    return axios.request({
      url: this.generateApiURI(uri),
      data: data,
      ...config
    })
  }

  delete (uri, config) {
    return axios.delete(this.generateApiURI(uri), {
      ...config
    })
  }
}

const client = new ApiClient()

export default client
