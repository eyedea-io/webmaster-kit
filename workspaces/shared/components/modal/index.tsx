import {
  ModalBackground,
  ModalClose,
  ModalContent,
  ModalInner,
  ModalSubtitle,
  ModalTitle,
  ModalWrapper
} from '@shared/components/modal/styled'
import {Store} from '@website/stores'
import {inject, observer} from 'mobx-react'
import * as React from 'react'

export interface Props {
  store?: Store
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
      <ModalWrapper>
        <ModalBackground onClick={modal.close} />

        <ModalInner>
          <ModalContent>
            <ModalClose onClick={modal.close}>
              <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                {/* tslint:disable-next-line:max-line-length */}
                <path fill="currentColor" d="M231.6 256l130.1-130.1c4.7-4.7 4.7-12.3 0-17l-22.6-22.6c-4.7-4.7-12.3-4.7-17 0L192 216.4 61.9 86.3c-4.7-4.7-12.3-4.7-17 0l-22.6 22.6c-4.7 4.7-4.7 12.3 0 17L152.4 256 22.3 386.1c-4.7 4.7-4.7 12.3 0 17l22.6 22.6c4.7 4.7 12.3 4.7 17 0L192 295.6l130.1 130.1c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17L231.6 256z" />
              </svg>
            </ModalClose>

            {title && (
              <ModalTitle>{title}</ModalTitle>
            )}
            {subtitle && (
              <ModalSubtitle>{subtitle}</ModalSubtitle>
            )}
            {children || <Component />}
          </ModalContent>
        </ModalInner>
      </ModalWrapper>
    )
  }
}

export {Modal}
