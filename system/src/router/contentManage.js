import ContentIndex from '../views/ContentManage/ContentIndex'
import ContentList from '../views/ContentManage/ContentList'
import ContentEditor from '../views/ContentManage/ContentEditor.vue'

export default [
  {
    path: '/ContentIndex/',
    component: ContentIndex,
    meta: {
      label: '内容发布管理'
    },
    children: [
      {
        name: 'ContentList',
        path: '/',
        component: ContentList,
        meta: {
          label: '内容发布管理'
        }
      },
      {
        name: 'ContentEditor',
        path: 'ContentEditor',
        component: ContentEditor,
        meta: {
          label: '内容编辑'
        }
      }
    ]
  },
]
