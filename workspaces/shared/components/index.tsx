// tslint:disable:max-line-length
import {loadable} from '@shared/utils/loadable'

export {Head} from './head'

import {LinkProps, NavLinkProps} from 'react-router-dom'
import {Props as IAvatar} from './avatar'
import {Props as IButton} from './button'
import {Props as IFlexLayout} from './flex-layout'
import {Props as IIcon} from './icon'
import {Props as IInput} from './input'
import {Props as IInputList} from './input-list'
import {Props as ILabel} from './label'
import {Props as IList} from './list'
import {Props as IMessage} from './message'
import {Props as IModal} from './modal'
import {Props as IPage} from './page'
import {Props as ISpinner} from './spinner'
import {Props as ITextarea} from './textarea'
import {Props as IWrapper} from './wrapper'

export const NavLink: React.ComponentType<NavLinkProps> = loadable(() => import('react-router-dom').then(res => res.NavLink))
export const Link: React.ComponentType<LinkProps> = loadable(() => import('react-router-dom').then(res => res.Link))
export const FlexLayout: React.ComponentType<IFlexLayout> = loadable(() => import('./flex-layout').then(res => res.FlexLayout))
export const InputList: React.ComponentType<IInputList> = loadable(() => import('./input-list').then(res => res.InputList))
export const Label: React.ComponentType<ILabel> = loadable(() => import('./label').then(res => res.Label))
export const List: React.ComponentType<IList> = loadable(() => import('./list').then(res => res.List))
export const Message: React.ComponentType<IMessage> = loadable(() => import('./message').then(res => res.Message))
export const Page: React.ComponentType<IPage> = loadable(() => import('./page').then(res => res.Page))
export const Wrapper: React.ComponentType<IWrapper> = loadable(() => import('./wrapper').then(res => res.Wrapper))
export const Avatar: React.ComponentType<IAvatar> = loadable(() => import('./avatar').then(res => res.Avatar))
export const Input: React.ComponentType<IInput> = loadable(() => import('./input').then(res => res.Input))
export const Button: React.ComponentType<IButton> = loadable(() => import('./button').then(res => res.Button))
export const Icon: React.ComponentType<IIcon> = loadable(() => import('./icon').then(res => res.Icon))
export const Modal: React.ComponentType<IModal> = loadable(() => import('./modal').then(res => res.Modal))
export const Spinner: React.ComponentType<ISpinner> = loadable(() => import('./spinner').then(res => res.Spinner))
export const Textarea: React.ComponentType<ITextarea> = loadable(() => import('./textarea').then(res => res.Textarea))
