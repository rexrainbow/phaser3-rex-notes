import Drawer from '../bob/drawer/Drawer';
import { DrawerTypeName } from '../bob/Types';

var CreateDrawerChild = function(renderCallback?: any, width?: any, height?: any) {
    var child = this.poolManager.allocate(DrawerTypeName);

    if (child === null) {
        child = new Drawer(
            this,               // parent
            renderCallback,
            width, height
        );
    } else {
        child
            .setParent(this)
            .setActive()
            .setRenderCallback(renderCallback)
            .setDrawerSize(width, height)
    }

    return child;
}
export default CreateDrawerChild;