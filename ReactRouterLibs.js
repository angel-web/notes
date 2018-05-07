const RouteWithSubRoutes = function (route, basePath = "") {
  let path = route.path
  if (/^\//.test(path)) {
    // route 的路径为绝对路径，不进行处理
  } else if (typeof basePath === 'string') {
    // route 的路径为相对路径，拼接基础路径
    basePath = /\/$/.test(basePath) ? basePath : basePath + '/'
    path = basePath + path
  }
  return <Route path={path} render={
    props => {
      if (!Array.isArray(route.children) || route.children.length === 0) {
        return <route.component {...props} routes={route.children} />
      } else {
        return <route.component {...props}>
          { route.children.map((item) => {
              return RouteWithSubRoutes(item, path)
            }) 
          }
        </route.component>
      }
    }
  }/>
}
