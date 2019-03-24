import {RouteComponentProps} from '@reach/router'
import NProgress from 'nprogress'
import {lazy} from 'react'

export const loadable = (promise: () => Promise<any>) =>
  lazy<React.FC<RouteComponentProps<{}>>>(() => {
    const doc = document.querySelector('html') as HTMLHtmlElement

    if (
      !doc.classList.contains('nprogress-busy') &&
      (parseInt(doc.dataset.nprogress || '0', 10) || 0) === 0
    ) {
      NProgress.start()
    }

    doc.dataset.nprogress = String((parseInt(doc.dataset.nprogress || '0', 10) || 0) + 1)

    return promise()
      .then(res => {
        maybeFinish()

        return res
      })
      .catch(err => {
        // tslint:disable-next-line:no-console
        console.error(err)
        maybeFinish()
        throw err
      })
  })

function maybeFinish() {
  const doc = document.querySelector('html') as HTMLHtmlElement

  doc.dataset.nprogress = String(parseInt(doc.dataset.nprogress || '0', 10) - 1)

  setTimeout(() => {
    if (parseInt(doc.dataset.nprogress || '0', 10) <= 0) {
      NProgress.done()
    }
  }, 10)
}
