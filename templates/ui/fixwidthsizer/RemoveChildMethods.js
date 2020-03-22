import Container from '../container/Container.js';

const RemoveItem = Phaser.Utils.Array.Remove;

export default {
    remove(gameObject) {
        var config = this.getSizerConfig(gameObject);
        if (config.parent !== this) {
            return this;
        }
        config.parent = undefined;
        RemoveItem(this.sizerChildren, gameObject);
        Container.prototype.remove.call(this, gameObject);
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
        Container.prototype.clear.call(this, destroyChild);
        return this;
    }
}