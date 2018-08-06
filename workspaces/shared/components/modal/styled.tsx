import styled from '@shared/utils/styled'

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  will-change: visibility, opacity;
  transition-duration: 0.25s;
  transition-property: visibility, opacity;
  z-index: 1000;

  ${_ => _.theme.media.tabletAndUp`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 16px;
    padding-bottom: 16px;
  `}
`

export const ModalBackground = styled.div`
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  position: fixed;
  z-index: -1;
  cursor: pointer;
  opacity: .9;
  background: linear-gradient(to bottom,hsl(0, 0%, 0%),hsl(0, 0%, 20%));
`

export const ModalInner = styled.div`
  display: flex;
  max-height: 100%;
  min-height: 100%;
  box-shadow: 0 2px 4px 0 hsla(0, 0%, 0%, 0.15);

  ${_ => _.theme.media.tabletAndUp`
    min-height: 0;
  `}
`

export const ModalContent = styled.div`
  background-color: hsl(0, 0%, 100%);
  color: hsl(0, 0%, 53%);
  padding: 32px;
  position: relative;
  overflow-y: auto;
  flex-grow: 1;
  box-shadow: 0 2px 30px hsla(0, 0%, 0%, 0.5);

  ${_ => _.theme.media.tabletAndUp`
    padding: 64px;
    min-width: 480px;
    border-radius: 5px;
  `}
`

export const ModalClose = styled.div`
  color: hsl(0, 0%, 80%);
  transition: color 0.25s;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: absolute;
  height: 12px;
  right: 32px;
  top: 32px;

  &:hover {
    color: hsl(0, 0%, 67%);
  }

  & > svg {
    height: 20px
  }
`

export const ModalTitle = styled.div`
  font-size: 28px;
  color: hsl(216, 18%, 11%);
  font-weight: 700;
  margin-bottom: 32px;
  line-height: 40px;
`

export const ModalSubtitle = styled.div`
  font-size: 16px;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`
