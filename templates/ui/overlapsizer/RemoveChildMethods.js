import Container from '../container/Container.js';

const ContainerRemove = Container.prototype.remove;
const ContainerClear = Container.prototype.clear;

export default {
    remove(gameObject, destroyChild) {
        var key;
        if (typeof (gameObject) === 'string') {
            key = gameObject;
            if (!this.sizerChildren.hasOwnProperty(key)) {
                return this;
            }
        } else if (this.getParentSizer(gameObject) !== this) {
            return this;
        } else {
            key = this.childToKey(gameObject);
        }

        delete this.sizerChildren[key];
        ContainerRemove.call(this, gameObject, destroyChild);
        return this;
    },

    removeAll(destroyChild) {
        var gameObject;
        for (var key in this.sizerChildren) {
            gameObject = this.sizerChildren[key];

            delete this.sizerChildren[key];
            ContainerRemove.call(this, gameObject, destroyChild);
        }
        return this;
    },

    clear(destroyChild) {
        this.removeAll(destroyChild);
        if (this.backgroundChildren) {
            this.backgroundChildren.length = 0;
        }
        ContainerClear.call(this, destroyChild);
        return this;
    }
}