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
        return this.parent.textureKey;
    }

    set key(value) {
        if (this.key === value) {
            return;
        }
        this.parent.setBaseTexture(value, this.baseFrameName);
    }

    get frame() {
        return this.parent.baseFrameName;
    }

    set frame(value) {
        if (this.frame === value) {
            return;
        }
        this.parent.setBaseTexture(this.parent.textureKey, value);
    }
}

export default Style;