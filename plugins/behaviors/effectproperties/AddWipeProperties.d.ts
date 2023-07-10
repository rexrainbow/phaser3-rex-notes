export default AddWipeProperties;

declare namespace AddWipeProperties {
    interface WipeGameObject extends Phaser.GameObjects.GameObject {
        wipeLeft: number | null | false;
        wipeRight: number | null | false;
        wipeUp: number | null | false;
        wipeDown: number | null | false;
        wipeWidth: number;
    }
}

declare function AddWipeProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddWipeProperties.WipeGameObject;
