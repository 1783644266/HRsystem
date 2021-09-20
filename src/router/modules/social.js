import Layout from '@/layout'

export default {
  path: '/social',
  name: 'social',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/social/index'),
      meta: {
        title: '社保'
      }
    },
  ]
}