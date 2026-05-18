import Container from '../../container/Container';

const ContainerAdd = Container.prototype.add;

var AddChild = function(gameObject?: any) {
    ContainerAdd.call(this, gameObject);

    if (this.sizerEventsEnable) {
        gameObject.emit('sizer.add', gameObject, this);
        this.emit('add', gameObject, this);
    }

    return this;
}

export default AddChild;