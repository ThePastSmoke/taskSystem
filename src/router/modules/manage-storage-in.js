// 入库管理
import Layout from '@/layout'
//  {  path: '', component: '' }
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default {
  path: '/manage-storage-in/list-in', // 路径
  name: 'manage-storage-in-list-in', // 给路由规则加一个name
  component: Layout, // 组件
  meta: {
    title: '入库管理',
    icon: 'icon-ruku'
  },
  // 配置二级路的路由表
  children: [
    {
      path: 'list', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      component: () => import('@/views/manage-storage-in/list'),
      // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
      meta: {
        title: '入库单',
        icon: 'icon-dian'
      }
    },
    {
      path: 'task-receive', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      component: () => import('@/views/manage-storage-in/task-receive'),
      // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
      meta: {
        title: '收获任务',
        icon: 'icon-dian'
      }
    },
    {
      path: 'task-add', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      component: () => import('@/views/manage-storage-in/task-add'),
      // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
      meta: {
        title: '上架任务',
        icon: 'icon-dian'
      }
    },
    {
      path: 'task-receiveDetail',
      component: () =>
        import('@/views/manage-storage-in/task-receive/components/detail'),
      hidden: true,
      meta: {
        title: '收货详情',
        activeMenu: '/manage-storage-in/list-in/task-receive'
      }
    },
    {
      path: 'task-task-addDetail',
      component: () =>
        import('@/views/manage-storage-in/task-add/components/detail'),
      hidden: true,
      meta: {
        title: '上架详情',
        activeMenu: '/manage-storage-in/list-in/task-add'
      }
    }
  ]
}

// 当你的访问地址 是 /employees的时候 layout组件会显示 此时 你的二级路由的默认组件  也会显示
