import Container from '../container/Container.js';

const RemoveItem = Phaser.Utils.Array.Remove;
const ContainerRemove = Container.prototype.remove;
const ContainerClear = Container.prototype.clear;

export default {
    // Override
    remove(gameObject, destroyChild) {
        // Override to remove from this.sizerChildren

        if (this.isBackground(gameObject)) {
            RemoveItem(this.backgroundChildren, gameObject);
        }
        ContainerRemove.call(this, gameObject, destroyChild);

        if (!destroyChild && this.sizerEventsEnable) {
            gameObject.emit('sizer.remove', gameObject, this);
        }
        return this;
    },

    // Override
    removeAll(destroyChild) {
        return this;
    },

    // Override
    clear(destroyChild) {
        // Override to clear this.sizerChildren

        if (this.backgroundChildren) {
            this.backgroundChildren.length = 0;
        }

        var fireRemoveEvent = !destroyChild && this.sizerEventsEnable;
        var children;
        if (fireRemoveEvent) {
            children = this.getChildren([]);
        }

        ContainerClear.call(this, destroyChild);

        if (fireRemoveEvent) {
            var gameObject;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                gameObject = children[i];
                gameObject.emit('sizer.remove', gameObject, this);
            }
        }
        return this;
    }
}