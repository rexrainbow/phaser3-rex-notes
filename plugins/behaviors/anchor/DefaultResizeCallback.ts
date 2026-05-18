import ResizeGameObject from '../../utils/size/ResizeGameObject';

var DefaultResizeCallback = function(width?: any, height?: any, gameObject?: any, anchor?: any) {
    ResizeGameObject(gameObject, width, height);
}

export default DefaultResizeCallback;