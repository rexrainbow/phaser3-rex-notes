import Container from '../../container/Container.js';
import GetParentSizerMethods from '../GetParentSizerMethods.js';

const RemoveItem = Phaser.Utils.Array.Remove;
const ContainerRemove = Container.prototype.remove;
const GetParentSizer = GetParentSizerMethods.getParentSizer;

var RemoveChild = function (gameObject, destroyChild) {
    // Invoke parent's removeChildCallback method
    var parent = GetParentSizer(gameObject);
    while (parent) {
        if (parent.removeChildCallback) {
            parent.removeChildCallback(gameObject, destroyChild)
        }
        parent = GetParentSizer(parent);
    }

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

export default RemoveChild;