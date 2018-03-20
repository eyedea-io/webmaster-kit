import _loadable from 'loadable-components'
import NProgress from 'nprogress'

export const loadable = promise => _loadable(() => {
  NProgress.start()

  return promise()
    .then(res => {
      NProgress.done()
      return res
    })
    .catch(err => {
      NProgress.done()
      throw err
    })
})
