export default AddShadowProperties;

declare namespace AddShadowProperties {
    interface Shadow {
        shadowColor: number | null | false;
        shadowX: number;
        shadowY: number;
        shadowDecay: number;
        shadowPower: number;
        shadowSamples: number;
        shadowIntensity: number;
    }

    interface ShadowGameObject extends Shadow, Phaser.GameObjects.GameObject {
    }

    interface ShadowCamera extends Shadow, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddShadowProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddShadowProperties.ShadowGameObject;

declare function AddShadowProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddShadowProperties.ShadowCamera;