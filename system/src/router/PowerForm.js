import PowerForm from '../views/Power/PowerForm'
import modular from '@/views/Power/modular'
import addPersonnel from '@/views/Power/addPersonnel'

export default [
  {
    path: '/identity/role',
    name: 'PowerForm',
    component: PowerForm,
    meta: {
      label: '人员列表'
    }
  },
  {
    path: '/identity/user',
    name: 'addPersonnel',
    component: addPersonnel,
    meta: {
      label: '人员权限管理'
    }
  },
  {
    path: '/identity/function',
    name: 'Modular',
    component: modular,
    meta: {
      label: '模块列表'
    }
  }
]
