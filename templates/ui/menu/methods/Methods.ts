import SetTransitCallbackMethods from './SetTransitCallbackMethods';
import DelayCallMethods from './DelayCallMethods';
import ExpandSubMenu from './ExpandSubMenu';
import Collapse from './Collapse';
import CollapseSubMenu from './CollapseSubMenu';

var Methods = {
    expandSubMenu: ExpandSubMenu,
    collapse: Collapse,
    collapseSubMenu: CollapseSubMenu,
}

Object.assign(
    Methods,
    SetTransitCallbackMethods,
    DelayCallMethods
)
export default Methods;