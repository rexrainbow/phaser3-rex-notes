import Text from './Text';

var IsCanvasTextGameObject = function(gameObject?: any) {
    return (gameObject instanceof Text);
}

export default IsCanvasTextGameObject;