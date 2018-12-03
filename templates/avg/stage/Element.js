import ContainerLite from '../../../plugins/gameobjects/containerlite/ContainerLite.js';
import FadeOutDestroy from '../../../plugins/fade-out-destroy.js';
import FadeIn from '../../../plugins/fade-in.js';

const Container = ContainerLite;
const GetValue = Phaser.Utils.Objects.GetValue;

class Element extends Container {
    constructor(scene, x, y, config) {
        super(scene, x, y, 2, 2);
        this.setName(GetValue(config, 'name', ''));
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
}

export default Element;