import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__index" */ '../../layouts/index.js'),
          LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
            .default,
        })
      : require('../../layouts/index.js').default,
    routes: [
      {
        path: '/404',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../404.js').default,
      },
      {
        path: '/:lang(en|ar)/404',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../404.js').default,
      },
      {
        path: '/KKContests/create',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__KKContests__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/KKContests/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__KKContests__create__index" */ '../KKContests/create/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../KKContests/create/index.js').default,
      },
      {
        path: '/:lang(en|ar)/KKContests/create',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__KKContests__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/KKContests/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__KKContests__create__index" */ '../KKContests/create/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../KKContests/create/index.js').default,
      },
      {
        path: '/KKContests/edit/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__KKContests__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/KKContests/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__KKContests__edit___id" */ '../KKContests/edit/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../KKContests/edit/$id.js').default,
      },
      {
        path: '/:lang(en|ar)/KKContests/edit/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__KKContests__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/KKContests/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__KKContests__edit___id" */ '../KKContests/edit/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../KKContests/edit/$id.js').default,
      },
      {
        path: '/KKContests',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__KKContests__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/KKContests/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__KKContests__index" */ '../KKContests/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../KKContests/index.js').default,
      },
      {
        path: '/:lang(en|ar)/KKContests',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__KKContests__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/KKContests/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__KKContests__index" */ '../KKContests/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../KKContests/index.js').default,
      },
      {
        path: '/KKContests/view/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__KKContests__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/KKContests/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__KKContests__view___id" */ '../KKContests/view/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../KKContests/view/$id.js').default,
      },
      {
        path: '/:lang(en|ar)/KKContests/view/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__KKContests__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/KKContests/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__KKContests__view___id" */ '../KKContests/view/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../KKContests/view/$id.js').default,
      },
      {
        path: '/about',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__about__index" */ '../about/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../about/index.js').default,
      },
      {
        path: '/:lang(en|ar)/about',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__about__index" */ '../about/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../about/index.js').default,
      },
      {
        path: '/banners',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__banners__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/banners/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__banners__index" */ '../banners/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../banners/index.js').default,
      },
      {
        path: '/:lang(en|ar)/banners',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__banners__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/banners/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__banners__index" */ '../banners/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../banners/index.js').default,
      },
      {
        path: '/competitions/create',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__competitions__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/competitions/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__competitions__create__index" */ '../competitions/create/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../competitions/create/index.js').default,
      },
      {
        path: '/:lang(en|ar)/competitions/create',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__competitions__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/competitions/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__competitions__create__index" */ '../competitions/create/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../competitions/create/index.js').default,
      },
      {
        path: '/competitions/edit/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__competitions__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/competitions/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__competitions__edit___id" */ '../competitions/edit/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../competitions/edit/$id.js').default,
      },
      {
        path: '/:lang(en|ar)/competitions/edit/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__competitions__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/competitions/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__competitions__edit___id" */ '../competitions/edit/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../competitions/edit/$id.js').default,
      },
      {
        path: '/competitions',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__competitions__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/competitions/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__competitions__index" */ '../competitions/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../competitions/index.js').default,
      },
      {
        path: '/:lang(en|ar)/competitions',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__competitions__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/competitions/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__competitions__index" */ '../competitions/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../competitions/index.js').default,
      },
      {
        path: '/competitions/view/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__competitions__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/competitions/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__competitions__view___id" */ '../competitions/view/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../competitions/view/$id.js').default,
      },
      {
        path: '/:lang(en|ar)/competitions/view/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__competitions__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/competitions/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__competitions__view___id" */ '../competitions/view/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../competitions/view/$id.js').default,
      },
      {
        path: '/contests',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__contests__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/contests/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__contests__index" */ '../contests/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../contests/index.js').default,
      },
      {
        path: '/:lang(en|ar)/contests',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__contests__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/contests/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__contests__index" */ '../contests/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../contests/index.js').default,
      },
      {
        path: '/contests/view/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__contests__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/contests/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__contests__view___id" */ '../contests/view/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../contests/view/$id.js').default,
      },
      {
        path: '/:lang(en|ar)/contests/view/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__contests__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/contests/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__contests__view___id" */ '../contests/view/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../contests/view/$id.js').default,
      },
      {
        path: '/help',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__help__index" */ '../help/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../help/index.js').default,
      },
      {
        path: '/:lang(en|ar)/help',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__help__index" */ '../help/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../help/index.js').default,
      },
      {
        path: '/home',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__home__index" */ '../home/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../home/index.js').default,
      },
      {
        path: '/:lang(en|ar)/home',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__home__index" */ '../home/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../home/index.js').default,
      },
      {
        path: '/',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__index" */ '../index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../index.js').default,
      },
      {
        path: '/:lang(en|ar)/',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__index" */ '../index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../index.js').default,
      },
      {
        path: '/leagues/create',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__leagues__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/leagues/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__leagues__create__index" */ '../leagues/create/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../leagues/create/index.js').default,
      },
      {
        path: '/:lang(en|ar)/leagues/create',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__leagues__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/leagues/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__leagues__create__index" */ '../leagues/create/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../leagues/create/index.js').default,
      },
      {
        path: '/leagues/edit/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__leagues__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/leagues/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__leagues__edit___id" */ '../leagues/edit/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../leagues/edit/$id.js').default,
      },
      {
        path: '/:lang(en|ar)/leagues/edit/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__leagues__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/leagues/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__leagues__edit___id" */ '../leagues/edit/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../leagues/edit/$id.js').default,
      },
      {
        path: '/leagues',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__leagues__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/leagues/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__leagues__index" */ '../leagues/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../leagues/index.js').default,
      },
      {
        path: '/:lang(en|ar)/leagues',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__leagues__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/leagues/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__leagues__index" */ '../leagues/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../leagues/index.js').default,
      },
      {
        path: '/leagues/view/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__leagues__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/leagues/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__leagues__view___id" */ '../leagues/view/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../leagues/view/$id.js').default,
      },
      {
        path: '/:lang(en|ar)/leagues/view/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__leagues__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/leagues/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__leagues__view___id" */ '../leagues/view/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../leagues/view/$id.js').default,
      },
      {
        path: '/login',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__login__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/login/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__login__index" */ '../login/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../login/index.js').default,
      },
      {
        path: '/:lang(en|ar)/login',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__login__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/login/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__login__index" */ '../login/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../login/index.js').default,
      },
      {
        path: '/players/create',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__players__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/players/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__players__create__index" */ '../players/create/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../players/create/index.js').default,
      },
      {
        path: '/:lang(en|ar)/players/create',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__players__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/players/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__players__create__index" */ '../players/create/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../players/create/index.js').default,
      },
      {
        path: '/players/edit/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__players__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/players/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__players__edit___id" */ '../players/edit/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../players/edit/$id.js').default,
      },
      {
        path: '/:lang(en|ar)/players/edit/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__players__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/players/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__players__edit___id" */ '../players/edit/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../players/edit/$id.js').default,
      },
      {
        path: '/players',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__players__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/players/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__players__index" */ '../players/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../players/index.js').default,
      },
      {
        path: '/:lang(en|ar)/players',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__players__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/players/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__players__index" */ '../players/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../players/index.js').default,
      },
      {
        path: '/players/view/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__players__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/players/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__players__view___id" */ '../players/view/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../players/view/$id.js').default,
      },
      {
        path: '/:lang(en|ar)/players/view/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__players__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/players/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__players__view___id" */ '../players/view/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../players/view/$id.js').default,
      },
      {
        path: '/request',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__request__index" */ '../request/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../request/index.js').default,
      },
      {
        path: '/:lang(en|ar)/request',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__request__index" */ '../request/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../request/index.js').default,
      },
      {
        path: '/slider/edit/:type',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__slider__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/slider/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__slider__edit___type" */ '../slider/edit/$type.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../slider/edit/$type.js').default,
      },
      {
        path: '/:lang(en|ar)/slider/edit/:type',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__slider__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/slider/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__slider__edit___type" */ '../slider/edit/$type.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../slider/edit/$type.js').default,
      },
      {
        path: '/slider',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__slider__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/slider/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__slider__index" */ '../slider/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../slider/index.js').default,
      },
      {
        path: '/:lang(en|ar)/slider',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__slider__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/slider/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__slider__index" */ '../slider/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../slider/index.js').default,
      },
      {
        path: '/sponsoredContests/create',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__sponsoredContests__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/sponsoredContests/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__sponsoredContests__create__index" */ '../sponsoredContests/create/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../sponsoredContests/create/index.js').default,
      },
      {
        path: '/:lang(en|ar)/sponsoredContests/create',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__sponsoredContests__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/sponsoredContests/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__sponsoredContests__create__index" */ '../sponsoredContests/create/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../sponsoredContests/create/index.js').default,
      },
      {
        path: '/sponsoredContests/edit/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__sponsoredContests__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/sponsoredContests/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__sponsoredContests__edit___id" */ '../sponsoredContests/edit/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../sponsoredContests/edit/$id.js').default,
      },
      {
        path: '/:lang(en|ar)/sponsoredContests/edit/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__sponsoredContests__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/sponsoredContests/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__sponsoredContests__edit___id" */ '../sponsoredContests/edit/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../sponsoredContests/edit/$id.js').default,
      },
      {
        path: '/sponsoredContests',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__sponsoredContests__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/sponsoredContests/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__sponsoredContests__index" */ '../sponsoredContests/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../sponsoredContests/index.js').default,
      },
      {
        path: '/:lang(en|ar)/sponsoredContests',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__sponsoredContests__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/sponsoredContests/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__sponsoredContests__index" */ '../sponsoredContests/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../sponsoredContests/index.js').default,
      },
      {
        path: '/sponsoredContests/view/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__sponsoredContests__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/sponsoredContests/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__sponsoredContests__view___id" */ '../sponsoredContests/view/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../sponsoredContests/view/$id.js').default,
      },
      {
        path: '/:lang(en|ar)/sponsoredContests/view/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__sponsoredContests__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/sponsoredContests/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__sponsoredContests__view___id" */ '../sponsoredContests/view/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../sponsoredContests/view/$id.js').default,
      },
      {
        path: '/teams/create',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__teams__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/teams/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__teams__create__index" */ '../teams/create/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../teams/create/index.js').default,
      },
      {
        path: '/:lang(en|ar)/teams/create',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__teams__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/teams/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__teams__create__index" */ '../teams/create/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../teams/create/index.js').default,
      },
      {
        path: '/teams/edit/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__teams__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/teams/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__teams__edit___id" */ '../teams/edit/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../teams/edit/$id.js').default,
      },
      {
        path: '/:lang(en|ar)/teams/edit/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__teams__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/teams/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__teams__edit___id" */ '../teams/edit/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../teams/edit/$id.js').default,
      },
      {
        path: '/teams',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__teams__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/teams/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__teams__index" */ '../teams/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../teams/index.js').default,
      },
      {
        path: '/:lang(en|ar)/teams',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__teams__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/teams/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__teams__index" */ '../teams/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../teams/index.js').default,
      },
      {
        path: '/teams/view/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__teams__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/teams/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__teams__view___id" */ '../teams/view/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../teams/view/$id.js').default,
      },
      {
        path: '/:lang(en|ar)/teams/view/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__teams__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/teams/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__teams__view___id" */ '../teams/view/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../teams/view/$id.js').default,
      },
      {
        path: '/users/create',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__users__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/users/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__users__create__index" */ '../users/create/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../users/create/index.js').default,
      },
      {
        path: '/:lang(en|ar)/users/create',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__users__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/users/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__users__create__index" */ '../users/create/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../users/create/index.js').default,
      },
      {
        path: '/users/edit/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__users__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/users/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__users__edit___id" */ '../users/edit/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../users/edit/$id.js').default,
      },
      {
        path: '/:lang(en|ar)/users/edit/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__users__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/users/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__users__edit___id" */ '../users/edit/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../users/edit/$id.js').default,
      },
      {
        path: '/users',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__users__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/users/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__users__index" */ '../users/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../users/index.js').default,
      },
      {
        path: '/:lang(en|ar)/users',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__users__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/users/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__users__index" */ '../users/index.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../users/index.js').default,
      },
      {
        path: '/users/view/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__users__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/users/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__users__view___id" */ '../users/view/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../users/view/$id.js').default,
      },
      {
        path: '/:lang(en|ar)/users/view/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__users__model.js' */ '/Users/hussenjamalalostath/untitled folder 37/src/pages/users/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__users__view___id" */ '../users/view/$id.js'),
              LoadingComponent: require('/Users/hussenjamalalostath/untitled folder 37/src/components/Loader/Loader')
                .default,
            })
          : require('../users/view/$id.js').default,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/hussenjamalalostath/untitled folder 37/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: false },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('/Users/hussenjamalalostath/untitled folder 37/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: false },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
