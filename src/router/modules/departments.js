import Layout from '@/layout'

export default {
  path: '/departments',
  name: 'departments',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/departments/index'),
      meta: {
        title: '组织架构'
      }
    },
  ]
}