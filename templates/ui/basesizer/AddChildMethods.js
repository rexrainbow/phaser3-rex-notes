import Container from '../container/Container.js';

const ContainerAdd = Container.prototype.add;

export default {
    pin(gameObject) {
        ContainerAdd.call(this, gameObject);
        return this;
    },

    addBackground(gameObject, childKey) {
        if (this.backgroundChildren === undefined) {
            this.backgroundChildren = [];
        }

        this.pin(gameObject);

        var config = this.getSizerConfig(gameObject);
        this.backgroundChildren.push(gameObject);

        if (childKey !== undefined) {
            this.addChildrenMap(childKey, gameObject)
        }
        return this;
    }
}