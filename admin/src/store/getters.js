const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers
}
export default getters
