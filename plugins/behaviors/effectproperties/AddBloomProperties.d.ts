export default AddBloomProperties;

declare namespace AddBloomProperties {
    interface BloomGameObject extends Phaser.GameObjects.GameObject {
        bloomColor: number | null | false;
        bloomOffsetX: number;
        bloomOffsetY: number;
        bloomBlurStrength: number;
        bloomStrength: number;
        bloomSteps: number;
    }
}

declare function AddBloomProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddBloomProperties.BloomGameObject;
