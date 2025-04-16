export default AddShineProperties;

declare namespace AddShineProperties {
    interface Shine {
        shineSpeed: number | null | false;
        shineLineWidth: number;
        shineGradient: number;
    }

    interface ShineGameObject extends Shine, Phaser.GameObjects.GameObject {
    }

    interface ShineCamera extends Shine, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddShineProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddShineProperties.ShineGameObject;

declare function AddShineProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddShineProperties.ShineCamera;