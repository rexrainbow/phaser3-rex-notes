import Base from '../../gameobjects/perspective/rendertexture/Base.js';
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
        this.useContainerBounds = GetValue(config, 'useContainerBounds', false);
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
            width: ((this.useContainerBounds) ? parentContainer.displayWidth : undefined),
            height: ((this.useContainerBounds) ? parentContainer.displayHeighth : undefined),
            originX: ((this.useContainerBounds) ? parentContainer.originX : undefined),
            originY: ((this.useContainerBounds) ? parentContainer.originY : undefined),
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

        this.started = true;
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
        return this;
    }
}

export default ContainerPerspective;
