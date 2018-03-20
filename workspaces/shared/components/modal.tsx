import {IStore} from '@website/types'
import {inject, observer} from 'mobx-react'
import * as React from 'react'

export interface Props {
  store?: IStore
  name?: string
  title?: string
  subtitle?: string
  component?: React.ComponentType
  children?: React.ReactChild
}

@inject('store')
@observer
class Modal extends React.Component<Props> {
  render() {
    const {modal} = this.props.store
    const {name, title, subtitle, children, component: Component} = this.props

    if (modal.active !== name) {
      return null
    }

    return (
      <div className={`Modal is-visible`}>
        <div className="Modal__bg" onClick={modal.close} />

        <div className="Modal__inner">
          <div className="Modal__content">
            <div className="Modal__close" onClick={modal.close}>
              <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                {/* tslint:disable-next-line:max-line-length */}
                <path fill="currentColor" d="M231.6 256l130.1-130.1c4.7-4.7 4.7-12.3 0-17l-22.6-22.6c-4.7-4.7-12.3-4.7-17 0L192 216.4 61.9 86.3c-4.7-4.7-12.3-4.7-17 0l-22.6 22.6c-4.7 4.7-4.7 12.3 0 17L152.4 256 22.3 386.1c-4.7 4.7-4.7 12.3 0 17l22.6 22.6c4.7 4.7 12.3 4.7 17 0L192 295.6l130.1 130.1c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17L231.6 256z" />
              </svg>
            </div>

            {title && (
              <h3 className="Modal__title">{title}</h3>
            )}
            {subtitle && (
              <p className="Modal__subtitle">{subtitle}</p>
            )}
            {children || <Component />}
          </div>
        </div>

        <style jsx>{`
          .Modal {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            will-change: visibility, opacity;
            transition-duration: 0.25s;
            transition-property: visibility, opacity;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            perspective: 2000px;
          }

          .Modal.is-visible {
            opacity: 1;
            visibility: visible;
          }

          .Modal__bg {
            right: 0;
            left: 0;
            top: 0;
            bottom: 0;
            position: fixed;
            z-index: -1;
            cursor: pointer;
            opacity: .9;
            background: linear-gradient(to bottom,#000,#333);
          }

          .Modal__inner {
            display: flex;
            max-height: 100%;
            min-height: 100%;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
          }

          .Modal__content {
            background-color: #ffffff;
            color: #868686;
            padding: 32px;
            position: relative;
            overflow-y: auto;
            will-change: transform, opacity;
            transform: rotate3d(1, 1, 0, -15deg);
            transform-origin: 100% 0;
            flex-grow: 1;
            transition-duration: 0.25s;
            transition-property: transform;
            box-shadow: 0 2px 30px rgba(0,0,0,.5);
          }

          .is-visible .Modal__content {
            transform: none;
          }

          .Modal__close {
            color: #ccc;
            transition: color 0.25s;
            display: flex;
            align-items: center;
            cursor: pointer;
            position: absolute;
            height: 12px;
            right: 32px;
            top: 32px;
          }

          .Modal__close svg {
            height: 20px;
          }

          .Modal__close:hover {
            color: #aaa;
          }

          .Modal__title {
            font-size: 28px;
            color: #171b21;
            font-weight: 700;
            margin-bottom: 32px;
            line-height: 40px;
          }

          .Modal__subtitle {
            font-size: 16px;
            max-width: 320px;
            margin-left: auto;
            margin-right: auto;
            text-align: center;
          }

          @media screen and (min-width: 720px) {
            .Modal {
              display: flex;
              align-items: center;
              justify-content: center;
              padding-top: 16px;
              padding-bottom: 16px;
            }

            .Modal__inner {
              min-height: 0;
            }

            .Modal__content {
              padding: 64px;
              min-width: 480px;
              border-radius: 5px;
            }
          }
        `}</style>
      </div>
    )
  }
}

export {Modal}
