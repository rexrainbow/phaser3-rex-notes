import Container from '../container/Container.js';

const RemoveItem = Phaser.Utils.Array.Remove;
const ContainerRemove = Container.prototype.remove;
const ContainerClear = Container.prototype.clear;

export default {
    remove(gameObject, destroyChild) {
        var config = this.getSizerConfig(gameObject);
        if (config.parent !== this) {
            return this;
        }
        config.parent = undefined;
        RemoveItem(this.sizerChildren, gameObject);
        ContainerRemove.call(this, gameObject, destroyChild);
        return this;
    },

    clear(destroyChild) {
        for (var i = 0, cnt = this.sizerChildren.length; i < cnt; i++) {
            this.getSizerConfig(this.sizerChildren[i]).parent = undefined;
        }
        this.sizerChildren.length = 0;
        ContainerClear.call(this, destroyChild);
        return this;
    }
}