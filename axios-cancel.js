/*
axios请求取消，
1、默认导出一个方法，接受唯一参数axios，在使用axios进行ajax请求之前调用，
2、调用之后返回一个对象，拥有两个方法
  1> cancelAll  --- 用于取消正在请求的ajax
  2> getRequestingList  ---- 用于获取正在请求的ajax列表
注：getRequestingList 获取的列表在下一秒都可能会改变，因为在请求完成或者失败会删除请求项
*/
export default function (axios) {
  let axiosId = 0
  let ajaxList = []
  let CancelToken = axios.CancelToken
  function deleteCancel (id) {
    let index
    for (let i in ajaxList) {
      if (ajaxList[i].id === id) {
        index = i
        break
      }
    }
    ajaxList.splice(index, 1)
  }
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let source = CancelToken.source()
    ajaxList.push({id: axiosId, cancel: source.cancel})
    axiosId++
    return {
      ...config,
      cancelToken: source.token,
      axiosId: axiosId
    }
  }, function (error) {
    if (error.config) {
      deleteCancel(error.config.axiosId)
    }
    // 对请求错误做些什么
    return Promise.reject(error)
  })

  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    if (response.config) {
      deleteCancel(response.config.axiosId)
    }
    // 对响应数据做点什么
    return response
  }, function (error) {
    if (error.config) {
      deleteCancel(error.config.axiosId)
    }
    // 对响应错误做点什么
    return Promise.reject(error)
  })
  return {
    cancelAll (message) {
      setTimeout(function () {
        ajaxList.forEach(function (item) {
          item.cancel(message || '取消了请求')
        })
        ajaxList = []
      })
    },
    getRequestingList () {
      return ajaxList
    }
  }
}
