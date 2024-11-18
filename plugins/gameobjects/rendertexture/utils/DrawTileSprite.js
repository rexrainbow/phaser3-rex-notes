import GetStampGameObject from './GetStampGameObject.js';

var DrawTileSprite = function (key, frame, x, y, width, height) {
    var gameObject = GetStampGameObject(this, 'TileSprite')
        .setTexture(key, frame)
        .setSize(width, height);

    this.draw(gameObject, x, y).render();
}

export default DrawTileSprite;