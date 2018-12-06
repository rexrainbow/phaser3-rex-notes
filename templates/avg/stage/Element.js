import ContainerLite from '../../../plugins/gameobjects/containerlite/ContainerLite.js';
import FadeOutDestroy from '../../../plugins/fade-out-destroy.js';
import FadeIn from '../../../plugins/fade-in.js';

const Container = ContainerLite;
const GetValue = Phaser.Utils.Objects.GetValue;

class Element extends Container {
    constructor(stage, rx, ry, config) {
        var scene = stage.scene;
        super(scene, 0, 0, 2, 2);
        this.stage = stage;
        this.setName(GetValue(config, 'name', ''));

        this.setRatioPosition(rx, ry);
    }

    replace(newGameObject, duration) {
        if (duration === undefined) {
            duration = 0;
        }
        // Fade-out old game object
        var oldGameObject = this.gameObject;
        if (oldGameObject) {
            if (newGameObject) {
                // Put old game object in front of new game object
                oldGameObject.depth = newGameObject.depth + 1;
            }
            this.remove(oldGameObject);
            FadeOutDestroy(oldGameObject, duration);
        }
        // Fade-in new game object
        if (newGameObject) {
            FadeIn(newGameObject, duration);
        }
        // Add new game object to container
        if (newGameObject) {
            newGameObject.setPosition(this.x, this.y);
            this.add(newGameObject);
            this.setSize(newGameObject.width, newGameObject.height);
        } else {
            this.setSize(2, 2);
        }
        return this;
    }

    get gameObject() {
        return this.getChildren()[0];
    }

    get textureKey() {
        var gameObject = this.gameObject;
        if (gameObject) {
            var texture = gameObject.texture;
            return (texture) ? texture.key : undefined;
        } else {
            return undefined;
        }
    }

    get x() {
        return super.x;
    }

    set x(value) {
        super.x = value;
        if (this.stage) {
            this.stage.resetChildState(this);
        }
    }

    get y() {
        return super.y;
    }

    set y(value) {
        super.y = value;
        if (this.stage) {
            this.stage.resetChildState(this);
        }
    }

    get rx() {
        return (this.x - this.stage.left) / this.stage.displayWidth;
    }

    set rx(value) {
        this.x = this.stage.left + (this.stage.displayWidth * value);
    }

    get ry() {
        return (this.y - this.stage.top) / this.stage.displayHeight;
    }

    set ry(value) {
        this.y = this.stage.top + (this.stage.displayHeight * value);
    }

    setRatioPosition(rx, ry) {
        this.rx = rx;
        this.ry = ry;
        return this;
    }

    setRx(rx) {
        this.rx = rx;
        return this;
    }

    setRy(ry) {
        this.ry = ry;
        return this;
    }
}

export default Element;