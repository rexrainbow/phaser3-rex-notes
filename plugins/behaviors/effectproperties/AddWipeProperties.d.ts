export default AddWipeProperties;

declare namespace AddWipeProperties {
    interface Wipe {
        wipeLeft: number | null | false;
        wipeRight: number | null | false;
        wipeUp: number | null | false;
        wipeDown: number | null | false;
        wipeWidth: number;
    }

    interface WipeGameObject extends Wipe, Phaser.GameObjects.GameObject {
    }

    interface WipeCamera extends Wipe, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddWipeProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddWipeProperties.WipeGameObject;

declare function AddWipeProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddWipeProperties.WipeCamera;
