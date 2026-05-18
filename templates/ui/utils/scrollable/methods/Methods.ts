import AddHeader from './AddHeader';
import AddFooter from './AddFooter';
import ResizeController from './ResizeController';
import UpdateController from './UpdateController';
import ChildPositionMethods from './ChildPositionMethods';

var Methods = {
    addHeader: AddHeader,
    addFooter: AddFooter,
    resizeController: ResizeController,
    updateController: UpdateController
}

Object.assign(
    Methods,
    ChildPositionMethods
)

export default Methods;