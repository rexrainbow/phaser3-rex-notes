import Drawer from '../bob/drawer/Drawer.js';
import { DrawerTypeName } from '../bob/Types.js';

var AppendDrawer = function (renderCallback, width, height) {
    var bob = this.poolManager.allocate(DrawerTypeName);

    if (bob === null) {
        bob = new Drawer(
            this,               // parent
            renderCallback,
            width, height
        );
    } else {
        bob
            .setParent(this)
            .setActive()
            .setRenderCallback(renderCallback)
            .setSize(width, height)
    }

    this.addChild(bob);

    return this;
};

export default AppendDrawer;