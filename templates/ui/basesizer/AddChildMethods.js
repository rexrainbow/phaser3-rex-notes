import Container from '../container/Container.js';

export default {
    pin(gameObject) {
        Container.prototype.add.call(this, gameObject);
        return this;
    },

    addBackground(gameObject, childKey) {
        if (this.backgroundChildren === undefined) {
            this.backgroundChildren = [];
        }

        this.pin(gameObject);

        var config = this.getSizerConfig(gameObject);
        config.parent = this;
        this.backgroundChildren.push(gameObject);

        if (childKey !== undefined) {
            this.addChildrenMap(childKey, gameObject)
        }
        return this;
    }
}