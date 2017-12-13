import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'
// import uifeatures from './uifeatures'
// import components from './components'
import users from './users'

// show: meta.label -> name
// name: component name
// meta.label: display label

const state = {
  items: [
    users,
    {
      name: 'Axios',
      path: '/axiosDemo',
      meta: {
        auth: true,
        icon: 'fa-rocket',
        link: 'axios/index.vue'
      },
      component: lazyLoading('axios', true)
    },
    {
      name: 'Charts',
      path: '/charts',
      meta: {
        icon: 'fa-bar-chart-o',
        expanded: false,
        link: 'charts/index.vue'
      },
      component: lazyLoading('charts', true)
    },
    {
      name: 'Tables',
      path: '/tables',
      meta: {
        icon: 'fa-table',
        expanded: false,
        link: 'tables/index.vue'
      },
      component: lazyLoading('tables', true)
    }
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    let items = []
    for (var i = 0; i < state.items.length; i++) {
      if (state.items[i].meta.label === 'Utilizadores') { // enfim...
        items.push(i)
      }
    }
    let realIndex = items[menuItem.index]

    if (menuItem.index > -1) {
      if (state.items[realIndex] && state.items[realIndex].meta) {
        state.items[realIndex].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}
