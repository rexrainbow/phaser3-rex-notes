import MakeChildImageGameObject from '../../../../utils/rendertexture/MakeChildImageGameObject.js';

var DrawTileSprite = function (frame, x, y, width, height) {
    var gameObject = MakeChildImageGameObject(this, '_tileSprite', 'tileSprite');
    gameObject.setTexture(this.textureKey, frame).setSize(width, height);
    this.draw(gameObject, x, y);
}

export default DrawTileSprite;