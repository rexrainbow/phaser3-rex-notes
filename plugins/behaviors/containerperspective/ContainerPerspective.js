import Base from '../../gameobjects/perspective/rendertexture/RenderTexture.js';
import Container from '../../gameobjects/containerlite/ContainerLite.js';
import Snapshot from '../../utils/rendertexture/Snapshot.js';

const ContainerAdd = Container.prototype.add;
const GetValue = Phaser.Utils.Objects.GetValue;

class ContainerPerspective extends Base {
    constructor(parentContainer, config) {
        var scene = parentContainer.scene;
        super(scene, parentContainer.x, parentContainer.y, 1, 1, config);
        scene.add.existing(this);
        this.setVisible(false);

        ContainerAdd.call(parentContainer, this);
        this.visibleSibling = [];
        this.perspectiveState = false;
        this.useParentBounds = GetValue(config, 'useParentBounds', false);

        this.boot();
    }

    boot() {
        var parentContainer = this.rexContainer.parent;
        parentContainer.on('destroy', this.destroy, this);
    }

    destroy(fromScene) {
        this.exit();
        super.destroy(fromScene);
    }

    enter() {
        this.exit();

        var parentContainer = this.rexContainer.parent;

        // Get and paste all visible children, which dose not include this render texture
        Snapshot({
            gameObjects: parentContainer.getAllVisibleChildren(),
            renderTexture: this.rt,
            x: this.x,
            y: this.y,
            width: ((this.useParentBounds) ? parentContainer.displayWidth : undefined),
            height: ((this.useParentBounds) ? parentContainer.displayHeighth : undefined),
            originX: ((this.useParentBounds) ? parentContainer.originX : undefined),
            originY: ((this.useParentBounds) ? parentContainer.originY : undefined),
        });
        this.syncSize();

        // Set this renderTexture to be visible
        parentContainer.setChildVisible(this, true);

        // Set visible sibling to be invisible
        parentContainer.children.forEach(function (child) {
            if (child !== this) {
                parentContainer.setChildVisible(child, false);
                this.visibleSibling.push(child);
            }
        }, this);

        this.perspectiveState = true;
        return this;
    }

    exit() {
        var parentContainer = this.rexContainer.parent;

        // Set all visible children to be visible back
        this.visibleSibling.forEach(function (child) {
            parentContainer.setChildVisible(child, true);
        }, this);
        this.visibleSibling.length = 0;

        // Set this renderTexture to be invisible        
        parentContainer.setChildVisible(this, false);
        this.perspectiveState = false;
        return this;
    }
}

export default ContainerPerspective;
