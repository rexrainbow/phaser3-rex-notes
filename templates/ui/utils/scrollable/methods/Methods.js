import AddHeader from './AddHeader.js';
import AddFooter from './AddFooter.js';
import ResizeController from './ResizeController.js';
import UpdateController from './UpdateController.js';
import ChildPositionMethods from './ChildPositionMethods.js';

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