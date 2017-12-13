const pkg = state => state.pkg
const app = state => state.app
const device = state => state.app.device
const sidebar = state => state.app.sidebar
const effect = state => state.app.effect
const menuitems = state => {
  let items = []
  for (var i = 0; i < state.menu.items.length; i++) {
    if (state.menu.items[i].meta.label === 'Utilizadores') { // enfim...
      items.push(state.menu.items[i])
    }
  }
  return items
}
const componententry = state => {
  return state.menu.items.filter(c => c.meta && c.meta.label === 'Components')[0]
}
const clientId = state => state.clientId
const adminEmail = state => state.admin.email

export {
  pkg,
  app,
  device,
  sidebar,
  effect,
  menuitems,
  componententry,
  clientId,
  adminEmail
}
