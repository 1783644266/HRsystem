import Layout from '@/layout'

export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees/index'),
      meta: {
        title: '员工'
      }
    },
  ]
}