import ResizeController from './ResizeController.js';
import UpdateController from './UpdateController.js';
import ChildPositionMethods from './ChildPositionMethods.js';

var Methods = {
    resizeController: ResizeController,
    updateController: UpdateController
}

Object.assign(
    Methods,
    ChildPositionMethods
)

export default Methods;