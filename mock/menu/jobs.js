module.exports = [
  {
    title: '企业管理',
    path: '/corp',
    icon: 'corp',
    module: 'jobs',
    children: [
      {
        title: '注册审核',
        path: '/check',
        icon: 'shenhe',
        children: [
          {
            title: '已审核',
            path: '/jobs/corp/0/register',
            icon: 'shenhe',
          },
          {
            title: '待审核',
            path: '/jobs/corp/2/register',
            icon: 'shenhe',
          },
          {
            title: '审核拒绝',
            path: '/jobs/corp/3/register',
            icon: 'shenhe',
          },
          {
            title: '信息未完善',
            path: '/jobs/corp/1/register',
            icon: 'shenhe',
          },
        ],
      },
      {
        title: '企业信息总库',
        path: '/jobs/corp/info',
        icon: 'renzheng',
      },
      // {
      //   title: '积分体系',
      //   path: '/jobs/corp/points',
      //   icon: 'jifen',
      // },
      // {
      //   title: '企业用户',
      //   path: '/jobs/corp/user',
      //   icon: 'corpuser',
      // },
    ],
  },
  {
    title: '招聘信息',
    path: '/jobinfo',
    icon: 'job',
    module: 'jobs',
    children: [
      {
        title: '待审核信息',
        path: '/jobs/jobinfo/1',
        icon: 'info',
      },
      {
        title: '已发布信息',
        path: '/jobs/jobinfo/0',
        icon: 'info',
      },
      {
        title: '审核失败信息',
        path: '/jobs/jobinfo/2',
        icon: 'info',
      },
    ],
  },
  {
    title: '招聘会',
    path: '/jobfair',
    icon: 'job',
    module: 'jobs',
    children: [
      {
        title: '筹备中',
        path: '/jobs/jobfair/0',
        icon: 'info',
      },
      {
        title: '已发布',
        path: '/jobs/jobfair/1',
        icon: 'info',
      },
    ],
  },
  {
    title: '校园宣讲会',
    path: '/campus',
    icon: 'job',
    module: 'jobs',
    children: [
      {
        title: '待审核',
        path: '/jobs/campus/1',
        icon: 'info',
      },
      {
        title: '已发布',
        path: '/jobs/campus/0',
        icon: 'info',
      },
    ],
  },
];
