export default AddBloomProperties;

declare namespace AddBloomProperties {
    interface Bloom {
        bloomColor: number | null | false;
        bloomOffsetX: number;
        bloomOffsetY: number;
        bloomBlurStrength: number;
        bloomStrength: number;
        bloomSteps: number;
    }

    interface BloomGameObject extends Bloom, Phaser.GameObjects.GameObject {
    }

    interface BloomCamera extends Bloom, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddBloomProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddBloomProperties.BloomGameObject;

declare function AddBloomProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddBloomProperties.BloomCamera;