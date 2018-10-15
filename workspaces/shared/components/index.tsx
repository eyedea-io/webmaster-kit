import {Link as RouterLink} from '@reach/router'
import {Block} from '@shared/components/block'
import styled from '@shared/utils/styled'
import * as React from 'react'
const StyledLink = styled(Block)`display: inline-block;`
export const Link = (props) => <StyledLink as={RouterLink} {...props} />

export {Head} from '@shared/components/head'
export {InputList} from '@shared/components/input-list'
export {Message} from '@shared/components/message'
export {List} from '@shared/components/list'
export {Container} from '@shared/components/container'
export {Avatar} from '@shared/components/avatar'
export {Input} from '@shared/components/input'
export {Button} from '@shared/components/button'
export {Icon} from '@shared/components/icon'
export {Spinner} from '@shared/components/spinner'
export {Modal} from '@shared/components/modal'
export {Label} from '@shared/components/label'
