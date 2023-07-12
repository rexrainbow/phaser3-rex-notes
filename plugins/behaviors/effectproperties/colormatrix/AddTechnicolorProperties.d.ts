export default AddTechnicolorProperties;

declare namespace AddTechnicolorProperties {
    interface TechnicolorGameObject extends Phaser.GameObjects.GameObject {
        technicolor: null | boolean;
    }
}

declare function AddTechnicolorProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddTechnicolorProperties.TechnicolorGameObject;
