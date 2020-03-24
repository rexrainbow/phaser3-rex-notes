import Container from '../container/Container.js';

const RemoveItem = Phaser.Utils.Array.Remove;
const ContainerRemove = Container.prototype.remove;
const ContainerClear = Container.prototype.clear;

export default {
    remove(gameObject, destroyChild) {
        if (this.getParentSizer(gameObject) !== this) {
            return this;
        }
        RemoveItem(this.sizerChildren, gameObject);
        ContainerRemove.call(this, gameObject, destroyChild);
        return this;
    },

    clear(destroyChild) {
        this.sizerChildren.length = 0;
        ContainerClear.call(this, destroyChild);
        return this;
    }
}