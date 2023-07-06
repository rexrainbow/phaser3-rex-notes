import ComponentBase from '../../../plugins/utils/componentbase/ComponentBase.js';

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

    get scale() {
        return this.parent.scaleX;
    }

    set scale(value) {
        this.parent.setScale(value);
    }
}

var HasProperty = function (target, prop) {
    return target.hasOwnProperty(prop) || HasPropertyDescriptor(target, prop);
}

var HasPropertyDescriptor = function (target, prop) {
    while (target) {
        if (Object.getOwnPropertyDescriptor(target, prop)) {
            return true;
        }
        target = target.__proto__;
    }
    return false;
}

export default Style;