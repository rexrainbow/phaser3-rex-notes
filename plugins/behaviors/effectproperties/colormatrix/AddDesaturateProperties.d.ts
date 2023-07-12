export default AddDesaturateProperties;

declare namespace AddDesaturateProperties {
    interface DesaturateGameObject extends Phaser.GameObjects.GameObject {
        desaturate: number | null | false;
    }
}

declare function AddDesaturateProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddDesaturateProperties.DesaturateGameObject;
