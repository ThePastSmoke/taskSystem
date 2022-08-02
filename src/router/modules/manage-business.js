// 商务管理
import Layout from '@/layout'
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default {
  path: '/manage-business', // 路径
  name: 'manage-business', // 给路由规则加一个name
  component: Layout, // 组件
  meta: {
    title: '商务管理', //
    icon: 'icon-shangwu'
  },
  // 配置二级路的路由表
  children: [
    {
      path: 'goods-owner', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      component: () => import('@/views/manage-business/goods-owner'),
      // 路由元信息  其实就是存储数据的对象 我们可以  在这里放置一些信息
      meta: {
        title: '货主管理', // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
        icon: 'icon-dian'
      }
    },
    {
      path: 'task-picking', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      component: () => import('@/views/manage-business/task-picking'),
      // 路由元信息  其实就是存储数据的对象 我们可以  在这里放置一些信息
      meta: {
        title: '运营商管理',
        icon: 'icon-dian'
      }
    }
  ]
}
