import Render from '../bob/render/Render.js';
import { RenderTypeName } from '../bob/Types.js';

var AppendRender = function (renderCallback, width, height) {
    var bob = this.poolManager.allocate(RenderTypeName);

    if (bob === null) {
        bob = new Render(
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

export default AppendRender;