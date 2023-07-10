export default AddRevealProperties;

declare namespace AddRevealProperties {
    interface RevealGameObject extends Phaser.GameObjects.GameObject {
        revealLeft: number | null | false;
        revealRight: number | null | false;
        revealUp: number | null | false;
        revealDown: number | null | false;
        revealWidth: number;
    }
}

declare function AddRevealProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddRevealProperties.RevealGameObject;
