import RenderTexture from '../../gameobjects/mesh/perspective/rendertexture/RenderTexture.js';
import Init from '../../gameobjects/containerlite/rendertexture/Init.js';
import Enter from '../../gameobjects/containerlite/rendertexture/Enter.js';
import Exit from '../../gameobjects/containerlite/rendertexture/Exit.js';

class ContainerPerspective extends RenderTexture {
    constructor(parentContainer, config) {
        var scene = parentContainer.scene;
        super(scene, 0, 0, 1, 1, config);
        scene.add.existing(this);

        Init(parentContainer, this, config);
    }

    destroy(fromScene) {
        if (!this.scene) {
            return;
        }

        this.exit();
        super.destroy(fromScene);
    }

    enter() {
        var result = Enter(this.rexContainer.parent, this);
        if (result) {
            this.syncSize();
        }

        return this;
    }

    exit() {
        Exit(this.rexContainer.parent, this);
        return this;
    }

    get perspectiveState() {
        return this.isRunning;
    }
}

export default ContainerPerspective;
