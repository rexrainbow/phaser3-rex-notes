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
        for (var i = 0, cnt = this.sizerChildren.length; i < cnt; i++) {
            this.getSizerConfig(this.sizerChildren[i]).parent = undefined;
        }
        this.sizerChildren.length = 0;
        Container.prototype.clear.call(this, destroyChild);
        return this;
    }
}