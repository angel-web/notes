# axios-cancel.js 用于axios请求的取消
1. 默认导出一个方法，接受唯一参数axios，在使用axios进行ajax请求之前调用，
2. 调用之后返回一个对象，拥有两个方法
  1. cancelAll  --- 用于取消正在请求的ajax
  2. getRequestingList  ---- 用于获取正在请求的ajax列表
  
4. getRequestingList 获取的列表在下一秒都可能会改变，因为在请求完成或者失败会删除请求项

# ReactRouterLibs.js react-router 路由配置处理函数


