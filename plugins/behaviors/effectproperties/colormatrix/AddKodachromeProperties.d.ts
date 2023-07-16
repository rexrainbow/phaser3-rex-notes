export default AddKodachromeProperties;

declare namespace AddKodachromeProperties {
    interface Kodachrome {
        kodachrome: null | boolean;
    }

    interface KodachromeGameObject extends Kodachrome, Phaser.GameObjects.GameObject {
    }

    interface KodachromeCamera extends Kodachrome, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddKodachromeProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddKodachromeProperties.KodachromeGameObject;

declare function AddKodachromeProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddKodachromeProperties.KodachromeCamera;