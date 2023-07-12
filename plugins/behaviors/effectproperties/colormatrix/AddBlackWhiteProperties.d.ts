export default AddBlackWhiteProperties;

declare namespace AddBlackWhiteProperties {
    interface BlackWhiteGameObject extends Phaser.GameObjects.GameObject {
        blackWhite: null | boolean;
    }
}

declare function AddBlackWhiteProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddBlackWhiteProperties.BlackWhiteGameObject;
