import AddChildrenMap from '../../../ui/basesizer/AddChildrenMap.js';
import GetElement from '../../../ui/basesizer/GetElement.js';
import MonitorTargetMethods from './MonitorTargetMethods.js';
import SetBindingTarget from './SetBindingTarget.js';
import Layout from './Layout.js';

var Methods = {
    addChildrenMap: AddChildrenMap,
    getElement: GetElement,

    setBindingTarget: SetBindingTarget,
    layout: Layout,
}

Object.assign(
    Methods,
    MonitorTargetMethods,
)

export default Methods;