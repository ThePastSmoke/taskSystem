// 出库管理
import Layout from '@/layout'
//  {  path: '', component: '' }
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default {
  path: '/manage-storage-out', // 路径
  name: 'manage-storage-out', // 给路由规则加一个name
  component: Layout, // 组件
  meta: {
    title: '出库管理',
    icon: 'icon-chuku'
  },
  // 配置二级路的路由表
  children: [
    {
      path: 'list-out', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      component: () => import('@/views/manage-storage-out/list-out'),
      // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
      meta: {
        title: '出库单',
        icon: 'icon-dian'
      }
    },
    {
      path: 'task-picking', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      component: () => import('@/views/manage-storage-out/task-picking'),
      // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
      meta: {
        title: '出库任务',
        icon: 'icon-dian'
      }
    },
    {
      path: 'manage-task-transfer', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      component: () =>
        import('@/views/manage-storage-out/manage-task-transfer'),
      // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
      meta: {
        title: '出库单',
        icon: 'icon-dian'
      }
    }
  ]
}

// 当你的访问地址 是 /employees的时候 layout组件会显示 此时 你的二级路由的默认组件  也会显示
