import InterfaceIndex from '../views/InterfaceManage/InterfaceIndex'
import InterfaceList from '../views/InterfaceManage/InterfaceList'
import InterfaceLog from '../views/InterfaceManage/InterfaceLog'
import InterfaceReport from '../views/InterfaceManage/InterfaceReport'
import InterfaceWhiteList from '../views/InterfaceManage/InterfaceWhiteList'

export default [
  {
    path: '/interface',
    component: InterfaceIndex,
    meta: {
      label: '接口配置管理'
    },
    children: [
      {
        name: 'InterfaceList',
        path: 'manage',
        component: InterfaceList,
        meta: {
          label: '接口配置管理'
        }
      },
      {
        name: 'InterfaceLog',
        path: 'InterfaceLog',
        component: InterfaceLog,
        meta: {
          label: '调用接口日志'
        }
      }
    ]
  },
  {
    name: 'InterfaceWhiteList',
    path: '/interface/whitename',
    component: InterfaceWhiteList,
    meta: {
      label: 'IP白名单管理'
    }
  },
  {
    name: 'InterfaceReport',
    path: '/interface/statement',
    component: InterfaceReport,
    meta: {
      label: '接口报表'
    }
  }
]