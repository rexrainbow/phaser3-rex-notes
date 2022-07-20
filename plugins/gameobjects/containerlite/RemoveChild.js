import Base from './Base.js';
import { GetParent } from './GetParent.js';
import GetLocalState from './utils/GetLocalState.js';

const BaseRemove = Base.prototype.remove;
const BaseClear = Base.prototype.clear;

export default {
    remove(gameObject, destroyChild) {
        if (GetParent(gameObject) !== this) {
            return this;
        }
        this.setParent(gameObject, null);

        if (!destroyChild) {
            // Move gameObject from layer to scene
            var layer = GetLocalState(gameObject).layer;
            if (layer) {
                layer.remove(gameObject);
            }
        }

        BaseRemove.call(this, gameObject, destroyChild);
        return this;
    },

    clear(destroyChild) {
        var children = this.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            this.setParent(child, null);

            if (!destroyChild) {
                var layer = GetLocalState(child).layer;
                if (layer) {
                    layer.remove(child);
                }
            }
        }
        BaseClear.call(this, destroyChild);
        return this;
    },
};