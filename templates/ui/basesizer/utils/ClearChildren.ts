import Container from '../../container/Container';

const ContainerClear = Container.prototype.clear;

var ClearChildren = function(destroyChild?: any) {
    if (this.backgroundChildren) {
        this.backgroundChildren.length = 0;
    }

    var fireRemoveEvent = !destroyChild && this.sizerEventsEnable;
    var children;
    if (fireRemoveEvent?: any) {
        children = this.getChildren([]);
    }

    ContainerClear.call(this, destroyChild);

    if (fireRemoveEvent?: any) {
        var gameObject;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            gameObject = children[i];
            gameObject.emit('sizer.remove', gameObject, this);
            this.emit('remove', gameObject, this);
        }
    }
    return this;
}

export default ClearChildren;