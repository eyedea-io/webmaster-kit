import {Block, Props as BlockProps} from '@shared/components/block'
import {hashStr} from '@shared/utils/hash-str'
import styled from '@shared/utils/styled'
import * as React from 'react'

export interface Props extends BlockProps {
  id?: string,
  src?: string
  size?: number
}

const StyledAvatar = styled(Block)`
  display: inline-flex;
  border: ${(props: Props) =>  props.src ? 'none' : `1px solid ${`hsl(${hashStr(props.id) % 360}, 60%, 92%)`}`};
  border-radius: 50%;
  overflow: hidden;
`

const StyledAvatarInner = styled.div`
  color: #5b55f7;
  background: ${props => `hsl(${hashStr(props.id) % 360}, 60%, 98%)`};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props: Props) => props.size}px;
  height: ${(props: Props) => props.size}px;

  & > svg {
    fill: ${props => `hsl(${hashStr(props.id) % 360}, 60%, 82%)`};
    width: ${props => props.size / 2.666}px;
    height: ${props => props.size / 2.666}px;
  }
  & > img {
    max-width: 100%;
    height: auto;
  }
`

export const Avatar = (props: Props) => (
  <StyledAvatar {...props}>
    <StyledAvatarInner {...props} size={props.size || 32}>
      {props.src ? (
        <img src={props.src} />
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          {/* tslint:disable-next-line:max-line-length */}
          <path d="M399.326 288.908C422.188 258.886 436 221.085 436 180 436 80.591 355.414 0 256 0 156.591 0 76 80.586 76 180c0 41.073 13.806 78.878 36.674 108.908C50.028 296.336 0 349.651 0 416v28.5C0 481.72 30.28 512 67.5 512h377c37.22 0 67.5-30.28 67.5-67.5V416c0-66.374-50.052-119.667-112.674-127.092zM256 48c72.902 0 132 59.098 132 132s-59.098 132-132 132-132-59.098-132-132S183.098 48 256 48zm208 396.5c0 10.77-8.73 19.5-19.5 19.5h-377c-10.77 0-19.5-8.73-19.5-19.5V416c0-44.183 35.817-80 80-80h38.14c55.486 31.968 124.026 32.087 179.72 0H384c44.183 0 80 35.817 80 80v28.5z" />
        </svg>
      )}
    </StyledAvatarInner>
  </StyledAvatar>
)
