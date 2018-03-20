import loadable from 'loadable-components'

export {NavLink} from 'react-router-dom'
export {Link} from 'react-router-dom'
export {FlexLayout} from './flex-layout'
export {InputList} from './input-list'
export {List} from './list'
export {Label} from './label'
export {Head} from './head'
export {Input} from './input'
export {Textarea} from './textarea'
export {Message} from './message'
export {Icon} from './icon'
export {Wrapper} from './wrapper'
export {Spinner} from './spinner'
export {Page} from './page'
export {Button} from './button'
export {Avatar} from './avatar'

/**
 * Components loaded dynamicaly are loaden only when needed.
 */
import {Props as IModal} from './modal'

export const Modal: React.ComponentType<IModal> = loadable(() => import('./modal').then(res => res.Modal || res))
