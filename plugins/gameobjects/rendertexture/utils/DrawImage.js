import GetStampGameObject from './GetStampGameObject.js';

var DrawImage = function (key, frame, x, y, width, height) {
    var gameObject = GetStampGameObject(this, 'Image')
        .setTexture(key, frame)
        .setDisplaySize(width, height);

    this.draw(gameObject, x, y).render();
}

export default DrawImage;