import Element from './Element.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

var SetBackground = function (gameObject, duration) {
    if (IsPlainObject(gameObject)) {
        var config = gameObject;
        gameObject = GetValue(config, 'background', undefined);
    }
    if (typeof (gameObject) === 'string') {
        var textureKey = gameObject;
        gameObject = this.scene.add.image(0, 0, textureKey);
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