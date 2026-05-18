import IndexOf from '../../../../plugins/utils/object/IndexOf';
import Container from '../../container/Container';

const ContainerSetChildVisible = Container.prototype.setChildVisible;

export default {
    setChildVisible(child?: any, visible?: any) {
        var key;
        if (typeof (child) === 'string') {
            var key = child;
            child = this.sizerChildren[key];
        } else {
            key = IndexOf(this.sizerChildren, child);
        }
        if (visible === undefined) {
            visible = (this.currentChildKey === key) ? true : false;
        }
        ContainerSetChildVisible.call(this, child, visible);
        return this;
    }
}