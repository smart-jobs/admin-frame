module.exports = [
  {
    title: '我的发文',
    icon: 'news',
    module: 'docflow',
    platform: 'master',
    children: [
      {
        title: '待发公文',
        path: '/docflow/draft',
        icon: 'caogao',
      },
      {
        title: '已发公文',
        path: '/docflow/draft/other',
        icon: 'doc1',
      },
    ],
  },
  {
    title: '中心发文',
    icon: 'news',
    module: 'docflow',
    platform: 'master',
    children: [
      {
        title: '在办公文',
        path: '/docflow/outbox',
        icon: 'doc1',
      },
      {
        title: '已办公文',
        path: '/docflow/outbox/done',
        icon: 'column',
      },
      {
        title: '归档公文',
        path: '/docflow/outbox/archive',
        icon: 'column',
      },
      {
        title: '公文回执',
        path: '/docflow/outbox/feedback',
        icon: 'column',
      },
    ],
  },
  {
    title: '收文管理',
    path: '/docflow',
    icon: 'news',
    module: 'docflow',
    platform: 'school',
    children: [
      {
        title: '待收公文',
        path: '/docflow/inbox/new',
        icon: 'caogao',
      },
      {
        title: '在办公文',
        path: '/docflow/inbox/read',
        icon: 'doc1',
      },
      {
        title: '已办公文',
        path: '/docflow/inbox/done',
        icon: 'column',
      },
    ],
  },
];
