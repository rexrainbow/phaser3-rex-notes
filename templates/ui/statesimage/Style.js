import ComponentBase from '../../../plugins/utils/componentbase/ComponentBase.js';

class Style extends ComponentBase {
    constructor(gameObject, style) {
        super(gameObject);
        // this.parent = gameObject;

        return new Proxy(this, this);
    }

    get(target, prop) {
        if (Object.getOwnPropertyDescriptor(target.__proto__, prop)) {
            return target[prop];
        }
        return target.parent[prop];
    }

    set(target, prop, value) {
        if (Object.getOwnPropertyDescriptor(target.__proto__, prop)) {
            target[prop] = value;
        }

        target.parent[prop] = value;
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

export default Style;