import Element from './Element.js';

var SetBackground = function (textureKey, frame, duration) {
    var gameObject;
    if (typeof (textureKey) === 'string') {
        gameObject = this.scene.add.image(0, 0, textureKey, frame);
    } else {
        gameObject = textureKey;
    }

    if (typeof (frame) === 'number') {
        duration = frame;
    }

    if (duration === undefined) {
        duration = 0;
    }
    if (gameObject) {
        gameObject.depth = this.backgroundDepth;
    }

    if (this.childrenMap.background === undefined) {
        this.setSize(gameObject.width, gameObject.height);
        var background = new Element(this, 0.5, 0.5);
        this.add(background);
        this.childrenMap.background = background;
    }

    this.childrenMap.background.replace(gameObject, duration);
    return this;
}
export default SetBackground;