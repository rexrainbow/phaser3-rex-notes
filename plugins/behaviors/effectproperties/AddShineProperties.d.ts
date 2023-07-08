export default AddShineProperties;

declare namespace AddShineProperties {
    interface ShineGameObject extends Phaser.GameObjects.GameObject {
        shineSpeed: number | null | false;
        shineLineWidth: number;
        shineGradient: number;
    }
}

declare function AddShineProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddShineProperties.ShineGameObject;
