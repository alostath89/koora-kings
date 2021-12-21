import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  app.use(require('../../plugins/onError.js').default);
app.use(require('/Users/hussenjamalalostath/untitled folder 37/node_modules/dva-immer/dist/index.js')());
  app.model({ namespace: 'app', ...(require('/Users/hussenjamalalostath/untitled folder 37/src/models/app.js').default) });
app.model({ namespace: 'common', ...(require('/Users/hussenjamalalostath/untitled folder 37/src/models/common.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
