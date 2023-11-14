import ResizeGameObject from '../../utils/size/ResizeGameObject.js';

var DefaultResizeCallback = function (width, height, gameObject, anchor) {
    ResizeGameObject(gameObject, width, height);
}

export default DefaultResizeCallback;