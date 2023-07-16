export default AddBlurProperties;

declare namespace AddBlurProperties {
    interface Blur {
        blurColor: number | null | false;
        blurQuality: number;
        blurX: number;
        blurY: number;
        blurStrength: number;
        blurSteps: number;
    }

    interface BlurGameObject extends Blur, Phaser.GameObjects.GameObject {
    }

    interface BlurCamera extends Blur, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddBlurProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddBlurProperties.BlurGameObject;

declare function AddBlurProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddBlurProperties.BlurCamera;