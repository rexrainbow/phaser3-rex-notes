import Container from '../container/Container.js';

const RemoveItem = Phaser.Utils.Array.Remove;
const ContainerRemove = Container.prototype.remove;

export default {
    remove(gameObject) {
        var config = this.getSizerConfig(gameObject);
        if (config.parent !== this) {
            return this;
        }
        config.parent = undefined;
        RemoveItem(this.gridChildren, gameObject);

        if (this.backgroundChildren !== undefined) {
            RemoveItem(this.backgroundChildren, gameObject);
        }
        ContainerRemove.call(this, gameObject);
        return this;
    }

}