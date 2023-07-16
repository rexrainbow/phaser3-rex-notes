export default AddBrownProperties;

declare namespace AddBrownProperties {
    interface Brown {
        brown: null | boolean;
    }

    interface BrownGameObject extends Brown, Phaser.GameObjects.GameObject {
    }

    interface BrownCamera extends Brown, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddBrownProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddBrownProperties.BrownGameObject;

declare function AddBrownProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddBrownProperties.BrownCamera;