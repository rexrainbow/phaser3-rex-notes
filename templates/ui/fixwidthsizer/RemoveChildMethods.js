import Container from '../container/Container.js';

const RemoveItem = Phaser.Utils.Array.Remove;
const ContainerRemove = Container.prototype.remove;
const ContainerClear = Container.prototype.clear

export default {
    remove(gameObject, destroyChild) {
        if (this.getParentSizer(gameObject) !== this) {
            return this;
        }
        RemoveItem(this.sizerChildren, gameObject);
        ContainerRemove.call(this, gameObject, destroyChild);
        return this;
    },

    removeAll(destroyChild) {
        for (var i = 0, cnt = this.sizerChildren.length; i < cnt; i++) {
            ContainerRemove.call(this, this.sizerChildren[i], destroyChild);
        }
        this.sizerChildren.length = 0;
        return this;
    },

    clear(destroyChild) {
        this.sizerChildren.length = 0;
        if (this.backgroundChildren) {
            this.backgroundChildren.length = 0;
        }
        ContainerClear.call(this, destroyChild);
        return this;
    }
}