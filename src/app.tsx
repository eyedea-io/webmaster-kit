import {CSS} from '@config'
import {observer} from '@utils'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import * as Router from 'react-router-dom'
import './icons'
import Modals from './modals'
import * as Routes from './routes'

@hot(module)
@observer
class App extends React.Component {
  render() {
    return (
      <Router.BrowserRouter>
        <React.Fragment>
          <Router.Switch>
            <Router.Route exact path="/" component={Routes.Index} />
            <Router.Route path="/auth" component={Routes.Auth.Index} />
            <Router.Route component={Routes.Missing} />
          </Router.Switch>

          <Modals />

          <div>
            <style jsx global>{`
              #nprogress {
                pointer-events: none;
              }
              #nprogress .bar {
                position: fixed;
                background: ${CSS.colors.primary};
                z-index: 1031;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
              }
              #nprogress .peg {
                display: block;
                position: absolute;
                right: 0px;
                width: 100px;
                height: 100%;
                box-shadow: 0 0 10px ${CSS.colors.primary}, 0 0 5px ${CSS.colors.primary};
                opacity: 1.0;
                transform: rotate(3deg) translate(0px, -4px);
              }
              #nprogress .spinner {
                display: none;
              }
              #nprogress .spinner-icon {
                width: 18px;
                height: 18px;
                box-sizing: border-box;
                border: solid 2px transparent;
                border-top-color: ${CSS.colors.primary};
                border-left-color: ${CSS.colors.primary};
                border-radius: 50%;
                animation: nprogress-spinner 400ms linear infinite;
              }
              .nprogress-custom-parent {
                overflow: hidden;
                position: relative;
              }
              .nprogress-custom-parent #nprogress .spinner,
              .nprogress-custom-parent #nprogress .bar {
                position: absolute;
              }
              @keyframes nprogress-spinner {
                0%   { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </React.Fragment>
      </Router.BrowserRouter>
    )
  }
}

export {App}
