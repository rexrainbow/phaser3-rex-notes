import SetTransitInCallback from './SetTransitInCallback.js';
import SetTransitOutCallback from './SetTransitOutCallback.js';
import DelayCallMethods from './DelayCallMethods.js';
import ExpandSubMenu from './ExpandSubMenu.js';
import Collapse from './Collapse.js';
import CollapseSubMenu from './CollapseSubMenu.js';
import IsInTouching from './IsInTouching.js';

var Methods = {
    setTransitInCallback: SetTransitInCallback,
    setTransitOutCallback: SetTransitOutCallback,
    expandSubMenu: ExpandSubMenu,
    collapse: Collapse,
    collapseSubMenu: CollapseSubMenu,
    isInTouching: IsInTouching,
}

Object.assign(
    Methods,
    DelayCallMethods
)
export default Methods;