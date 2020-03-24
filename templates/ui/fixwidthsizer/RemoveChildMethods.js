import Container from '../container/Container.js';

const RemoveItem = Phaser.Utils.Array.Remove;
const ContainerRemove = Container.prototype.remove;
const ContainerClear = Container.prototype.clear

export default {
    remove(gameObject) {
        if (this.getParentSizer(gameObject) !== this) {
            return this;
        }
        RemoveItem(this.sizerChildren, gameObject);
        ContainerRemove.call(this, gameObject);
        return this;
    },

    clear(destroyChild) {
        this.sizerChildren.length = 0;
        ContainerClear.call(this, destroyChild);
        return this;
    }
}