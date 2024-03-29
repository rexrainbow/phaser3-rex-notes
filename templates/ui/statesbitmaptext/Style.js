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

    get fontSize() {
        return this.parent.fontSize;
    }

    set fontSize(value) {
        this.parent.setFontSize(value);
    }

    get tint() {
        return this.parent.tintTopLeft;
    }

    set tint(value) {
        this.parent.setTint(value);
    }
    get letterSpacing() {
        return this.parent.letterSpacing;
    }

    set letterSpacing(value) {
        this.parent.setLetterSpacing(value);
    }

    get lineSpacing() {
        return this.parent.lineSpacing;
    }

    set lineSpacing(value) {
        this.parent.setLineSpacing(value);
    }

}

export default Style;