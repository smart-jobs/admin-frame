const { Router } = require('express');
const system = require('./system');
const link = require('./link');
const jobs = require('./jobs');
const docflow = require('./docflow');
const cms = require('./cms');

const router = Router();

const navDatas = [
  {
    title: '系统管理',
    path: '/system',
    module: 'system',
  },
  {
    title: '招聘管理',
    path: '/jobs',
    module: 'jobs',
  },
  // {
  //   title: '信息发布',
  //   path: '/cms',
  //   module: 'cms',
  // },
  {
    title: '公文系统',
    path: '/docflow',
    module: 'docflow',
  },
  ...link,
];

const datas = [...system, ...jobs, ...cms, ...docflow, ...link];

const MapMenu = (catalog = []) => item => ({
  title: item.title,
  options: {
    icon: item.icon,
    path: item.path,
    url: item.url,
    target: item.target,
    tooltip: item.tooltip,
    module: item.module,
    platform: item.platform,
    roles: item.roels,
    tags: item.tags,
    meta: { catalog: catalog.concat(item.title) },
  },
  children: (item.children || []).map(MapMenu(catalog.concat(item.title))),
});

const menus = datas.map(MapMenu());
const modules = navDatas.map(MapMenu());

/* GET menus define. */
router.get('/menu/load', function(req, res, next) {
  res.json({ errcode: 0, errmsg: 'ok', data: { items: menus, modules } });
});
router.get('/menu/:module', function(req, res, next) {
  const module = req.params.module;
  const items = menus.filter(p => p.options.module == module);
  res.json({ errcode: 0, errmsg: 'ok', data: { items, modules } });
});

module.exports = router;
