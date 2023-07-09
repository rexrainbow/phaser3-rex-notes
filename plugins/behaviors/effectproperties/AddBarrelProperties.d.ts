export default AddBarrelProperties;

declare namespace AddBarrelProperties {
    interface BarrelGameObject extends Phaser.GameObjects.GameObject {
        barrel: number | null | false;
    }
}

declare function AddBarrelProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddBarrelProperties.BarrelGameObject;
