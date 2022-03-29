import MakeChildImageGameObject from '../../../../utils/rendertexture/MakeChildImageGameObject.js';

var DrawImage = function (frame, x, y, width, height) {
    var gameObject = MakeChildImageGameObject(this, '_image', 'image');
    gameObject.setTexture(this.textureKey, frame).setDisplaySize(width, height);
    this.draw(gameObject, x, y);
}

export default DrawImage;