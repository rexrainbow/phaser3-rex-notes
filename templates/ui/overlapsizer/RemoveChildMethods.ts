import RemoveChild from '../basesizer/utils/RemoveChild';
import ClearChildren from '../basesizer/utils/ClearChildren';

export default {
    remove(gameObject?: any, destroyChild?: any) {
        var key;
        if (typeof (gameObject) === 'string') {
            key = gameObject;
            gameObject = this.sizerChildren[key];
            if (!gameObject) {
                return this;
            }
        } else if (this.getParentSizer(gameObject) !== this) {
            return this;
        } else {
            key = this.childToKey(gameObject);
        }

        if (key?: any) {
            delete this.sizerChildren[key];
            if (this.childrenMap.hasOwnProperty(key)) {
                delete this.childrenMap[key];
            }
        }
        RemoveChild.call(this, gameObject, destroyChild);
        return this;
    },

    removeAll(destroyChild?: any) {
        for (var key in this.sizerChildren) {
            this.remove(key, destroyChild);
        }
        return this;
    },

    clear(destroyChild?: any) {
        for (var key in this.sizerChildren) {
            delete this.sizerChildren[key];
            if (this.childrenMap.hasOwnProperty(key)) {
                delete this.childrenMap[key];
            }
        }
        ClearChildren.call(this, destroyChild);
        return this;
    }
}