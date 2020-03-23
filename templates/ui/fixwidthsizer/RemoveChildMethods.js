import Container from '../container/Container.js';

const RemoveItem = Phaser.Utils.Array.Remove;
const ContainerRemove = Container.prototype.remove;
const ContainerClear = Container.prototype.clear

export default {
    remove(gameObject) {
        var config = this.getSizerConfig(gameObject);
        if (config.parent !== this) {
            return this;
        }
        config.parent = undefined;
        RemoveItem(this.sizerChildren, gameObject);
        ContainerRemove.call(this, gameObject);
        return this;
    },

    clear(destroyChild) {
        var children = this.sizerChildren, child;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (child === '\n') {
                continue;
            }
            this.getSizerConfig(child).parent = undefined;
        }
        children.length = 0;
        ContainerClear.call(this, destroyChild);
        return this;
    }
}