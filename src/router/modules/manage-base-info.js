// 基础仓库信息
import Layout from '@/layout'
//  {  path: '', component: '' }
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default {
  path: '/manage-base-info', // 路径
  name: 'manage-base-info', // 给路由规则加一个name
  component: Layout, // 组件
  meta: {
    title: '基础信息管理', // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
    icon: 'icon-xinxi'
  },
  // 配置二级路的路由表
  children: [
    {
      path: 'warehouse', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      component: () => import('@/views/manage-base-info/warehouse'),
      // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
      meta: {
        title: '仓库管理', // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
        icon: 'icon-dian'
      }
    },
    {
      path: 'area',
      component: () => import('@/views/manage-base-info/area'),
      meta: {
        title: '库区管理',
        icon: 'icon-dian'
      }
    },
    {
      path: 'location',
      component: () => import('@/views/manage-base-info/location'),
      meta: {
        title: '库位管理',
        icon: 'icon-dian'
      }
    },
    {
      path: 'location-view',
      component: () => import('@/views/manage-base-info/location-view'),
      meta: {
        title: '库位视图',
        icon: 'icon-dian'
      }
    },
    {
      path: 'goods',
      component: () => import('@/views/manage-base-info/goods'),
      meta: {
        title: '货品管理',
        icon: 'icon-dian'
      }
    },
    {
      path: 'goods-type',
      component: () => import('@/views/manage-base-info/goods-type'),
      meta: {
        title: '货品类型',
        icon: 'icon-dian'
      }
    },
    {
      path: 'warehouse/details',
      component: () => import('@/views/manage-base-info/warehouse/details'),
      hidden: true,

      meta: {
        title: '新增仓库',
        activeMenu: '/manage-base-info/warehouse'
      }
    },
    {
      path: 'areaDetails',
      component: () =>
        import('@/views/manage-base-info/area/component/areaDetails'),
      hidden: true,

      meta: {
        title: '新增仓库',
        activeMenu: '/manage-base-info/warehouse'
      }
    },
    {
      path: 'locationDetails',
      component: () =>
        import('@/views/manage-base-info/location/component/details'),
      hidden: true,

      meta: {
        title: '新增仓库',
        activeMenu: '/manage-base-info/warehouse'
      }
    },
    {
      path: 'goodsDetails',
      component: () =>
        import('@/views/manage-base-info/goods/components/details'),
      hidden: true,

      meta: {
        title: '新增货品',
        activeMenu: '/manage-base-info/warehouse'
      }
    }
  ]
}

// 当你的访问地址 是 /employees的时候 layout组件会显示 此时 你的二级路由的默认组件  也会显示
