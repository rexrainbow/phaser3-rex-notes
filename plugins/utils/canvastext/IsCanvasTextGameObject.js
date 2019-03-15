import TextKlass from './Text.js';

var IsCanvasTextGameObject = function (gameObject) {
    return (gameObject instanceof TextKlass);
}

export default IsCanvasTextGameObject;