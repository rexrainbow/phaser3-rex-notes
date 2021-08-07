import Container from '../container/Container.js';

const RemoveItem = Phaser.Utils.Array.Remove;
const ContainerRemove = Container.prototype.remove;
const ContainerClear = Container.prototype.clear;

var RemoveChild = function (gameObject, destroyChild) {
    if (this.isBackground(gameObject)) {
        RemoveItem(this.backgroundChildren, gameObject);
    }
    ContainerRemove.call(this, gameObject, destroyChild);

    if (!destroyChild && this.sizerEventsEnable) {
        gameObject.emit('sizer.remove', gameObject, this);
        this.emit('remove', gameObject, this);
    }
    return this;
}

var ClearChildren = function (destroyChild) {
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

export { RemoveChild, ClearChildren };

export default {
    // Override
    remove(gameObject, destroyChild) {
    },

    // Override
    removeAll(destroyChild) {
        return this;
    },

    // Override
    clear(destroyChild) {
        // This method also will be invoked in sizer.destroy() <- containerLite.destroy()
        // Override to clear this.sizerChildren
    }
}