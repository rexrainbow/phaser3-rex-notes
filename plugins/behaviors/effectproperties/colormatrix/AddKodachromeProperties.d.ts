export default AddKodachromeProperties;

declare namespace AddKodachromeProperties {
    interface KodachromeGameObject extends Phaser.GameObjects.GameObject {
        kodachrome: null | boolean;
    }
}

declare function AddKodachromeProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddKodachromeProperties.KodachromeGameObject;
