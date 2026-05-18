import Init from './Init';
import Enter from './Enter';
import Exit from './Exit';

var MeshRenderTextureBase = function(RenderTextureOwnerClass?: any) {
    return class Base extends RenderTextureOwnerClass {
    ignoreDestroy: any;
    rexContainer: any;
    scene: any;
    setSizeToFrame: any;

        constructor(parentContainer?: any, config?: any) {
            var scene = parentContainer.scene;
            super(scene, 0, 0, 1, 1, config);
            scene.add.existing(this);

            Init(parentContainer, this, config);
        }

        destroy(fromScene?: any) {
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            this.exit();
            super.destroy(fromScene);
        }

        enter() {
            var result = Enter(this.rexContainer.parent, this);
            if (result?: any) {
                this.setSizeToFrame();
            }
            return this;
        }

        exit() {
            Exit(this.rexContainer.parent, this);
            return this;
        }
    }
}

export default MeshRenderTextureBase;