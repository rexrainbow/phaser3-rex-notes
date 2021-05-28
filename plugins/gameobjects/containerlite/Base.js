const Zone = Phaser.GameObjects.Zone;
const AddItem = Phaser.Utils.Array.Add;
const RemoveItem = Phaser.Utils.Array.Remove;

class Base extends Zone {
    constructor(scene, x, y, width, height) {
        if (width === undefined) {
            width = 1;
        }
        if (height === undefined) {
            height = 1;
        }
        super(scene, x, y, width, height);
        this.children = [];
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        this.clear(!fromScene);
        super.destroy(fromScene);
    }

    contains(gameObject) {
        return (this.children.indexOf(gameObject) !== -1);
    }

    add(gameObjects) {
        var parent = this;
        AddItem(this.children, gameObjects, 0,
            // Callback of item added
            function (gameObject) {
                gameObject.on('destroy', OnChildDestroy, parent);
            }, this);
        return this;
    }

    remove(gameObjects, destroyChild) {
        var parent = this;
        RemoveItem(this.children, gameObjects,
            // Callback of item removed
            function (gameObject) {
                gameObject.off('destroy', OnChildDestroy, parent);
                if (destroyChild) {
                    gameObject.destroy();
                }
            }
        );
        return this;
    }

    clear(destroyChild) {
        var parent = this;
        var gameObject;
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
            gameObject = this.children[i];
            gameObject.off('destroy', OnChildDestroy, parent);
            if (destroyChild) {
                gameObject.destroy();
            }
        }
        this.children.length = 0;
        return this;
    }
}

var OnChildDestroy = function (child, destroyFromScene) {
    this.remove(child, !destroyFromScene);
}

const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(Base,
    [
        Components.Alpha,
        Components.Flip
    ]
);

export default Base;