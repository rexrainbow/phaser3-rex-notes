export default AddBlackWhiteProperties;

declare namespace AddBlackWhiteProperties {

    interface BlackWhite {
        blackWhite: null | boolean;
    }

    interface BlackWhiteGameObject extends BlackWhite, Phaser.GameObjects.GameObject {
    }

    interface BlackWhiteCamera extends BlackWhite, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddBlackWhiteProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddBlackWhiteProperties.BlackWhiteGameObject;

declare function AddBlackWhiteProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera,
): AddBlackWhiteProperties.BlackWhiteCamera;