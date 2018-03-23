import _loadable from 'loadable-components'
import NProgress from 'nprogress'

export const loadable = promise => _loadable(() => {
  const doc = document.querySelector('html')

  if (!doc.classList.contains('nprogress-busy') && (parseInt(doc.dataset.nprogress, 10) || 0) === 0) {
    NProgress.start()
  }

  doc.dataset.nprogress = String((parseInt(doc.dataset.nprogress, 10) || 0) + 1)

  return promise()
    .then(res => {
      maybeFinish()

      return res
    })
    .catch(err => {
      maybeFinish()
      throw err
    })
})

function maybeFinish() {
  const doc = document.querySelector('html')

  doc.dataset.nprogress = String(parseInt(doc.dataset.nprogress, 10) - 1)

  setTimeout(() => {
    if (parseInt(doc.dataset.nprogress, 10) <= 0) {
      NProgress.done()
    }
  }, 10)
}
