import MakeChildImageGameObject from "../../../../utils/rendertexture/MakeChildImageGameObject";

var DrawTileSprite = function (key, frame, x, y, width, height) {
    var gameObject = MakeChildImageGameObject(this, '_tileSprite', 'tileSprite')
        .setTexture(key, frame)
        .setSize(width, height);

    this.draw(gameObject, x, y);
}

export default DrawTileSprite;