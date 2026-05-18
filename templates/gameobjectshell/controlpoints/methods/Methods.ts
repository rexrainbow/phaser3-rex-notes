import AddChildrenMap from '../../../ui/basesizer/AddChildrenMap';
import GetElement from '../../../ui/basesizer/GetElement';
import MonitorTargetMethods from './MonitorTargetMethods';
import SetBindingTarget from './SetBindingTarget';
import Layout from './Layout';

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