module.exports = [
  {
    title: '系统管理',
    path: '/system',
    icon: 'system',
    module: 'system',
    children: [
      {
        title: '用户管理',
        path: '/system/user',
        icon: 'account',
      },
      {
        title: '部门管理',
        path: '/system/dept',
        icon: 'dept',
      },
      {
        title: '标签用户',
        path: '/system/tag',
        icon: 'tag',
      },
      {
        title: '单位管理',
        path: '/system/unit',
        icon: 'corp',
        platform: 'master',
      },
      {
        title: '字典管理',
        path: '/system/dict',
        icon: 'dict',
        platform: 'master',
      },
      // {
      //   title: '操作日志',
      //   path: '/system/log',
      //   icon: 'log',
      // },
    ],
  },
];
