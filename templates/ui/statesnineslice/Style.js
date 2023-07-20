import ComponentBase from '../../../plugins/utils/componentbase/ComponentBase.js';
import HasProperty from '../../../plugins/utils/object/HasProperty.js';

class Style extends ComponentBase {
    constructor(gameObject, style) {
        super(gameObject);
        // this.parent = gameObject;

        return new Proxy(this, this);
    }

    get(target, prop) {
        if (HasProperty(target, prop)) {
            return target[prop];
        }

        var gameObject = target.parent;
        if (HasProperty(gameObject, prop)) {
            return gameObject[prop];
        }
    }

    set(target, prop, value) {
        if (HasProperty(target, prop)) {
            target[prop] = value;

        } else if (HasProperty(target.parent, prop)) {
            target.parent[prop] = value;
        }

        return true;
    }

    get key() {
        return this.parent.texture.key;
    }

    set key(value) {
        this.parent.setTexture(value, this.frame);
    }

    get frame() {
        return this.parent.frame.name;
    }

    set frame(value) {
        this.parent.setFrame(value);
    }

    get leftWidth() {
        return this.parent.leftWidth;
    }

    set leftWidth(value) {
        var gameObject = this.parent;
        parent.setSlices(gameObject.width, gameObject.height, value, gameObject.rightWidth, gameObject.topHeight, gameObject.bottomHeight);
    }

    get rightWidth() {
        return this.parent.rightWidth;
    }

    set rightWidth(value) {
        var gameObject = this.parent;
        parent.setSlices(gameObject.width, gameObject.height, gameObject.leftWidth, value, gameObject.topHeight, gameObject.bottomHeight);
    }

    get topHeight() {
        return this.parent.topHeight;
    }

    set topHeight(value) {
        var gameObject = this.parent;
        parent.setSlices(gameObject.width, gameObject.height, gameObject.leftWidth, gameObject.rightWidth, value, gameObject.bottomHeight);
    }

    get bottomHeight() {
        return this.parent.bottomHeight;
    }

    set bottomHeight(value) {
        var gameObject = this.parent;
        parent.setSlices(gameObject.width, gameObject.height, gameObject.leftWidth, gameObject.rightWidth, gameObject.topHeight, value);
    }
}

export default Style;