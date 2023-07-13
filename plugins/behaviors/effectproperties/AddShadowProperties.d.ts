export default AddShadowProperties;

declare namespace AddShadowProperties {
    interface ShadowGameObject extends Phaser.GameObjects.GameObject {
        shadowColor: number | null | false;
        shadowX: number;
        shadowY: number;
        shadowDecay: number;
        shadowPower: number;
        shadowSamples: number;
        shadowIntensity: number;

    }
}

declare function AddShadowProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddShadowProperties.ShadowGameObject;
