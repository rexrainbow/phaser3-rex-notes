import Base from './Base.js';

const BaseRemove = Base.prototype.remove;
const BaseClear = Base.prototype.clear;

export default {
    remove(gameObject, destroyChild) {
        if (this.getParent(gameObject) !== this) {
            return this;
        }
        this.setParent(gameObject, null);
        BaseRemove.call(this, gameObject, destroyChild);
        return this;
    },

    clear(destroyChild) {
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
            this.setParent(this.children[i], null);
        }
        BaseClear.call(this, destroyChild);
        return this;
    },
};