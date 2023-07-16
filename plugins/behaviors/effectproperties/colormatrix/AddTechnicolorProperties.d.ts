export default AddTechnicolorProperties;

declare namespace AddTechnicolorProperties {
    interface Technicolor {
        technicolor: null | boolean;
    }

    interface TechnicolorGameObject extends Technicolor, Phaser.GameObjects.GameObject {
    }

    interface TechnicolorCamera extends Technicolor, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddTechnicolorProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddTechnicolorProperties.TechnicolorGameObject;

declare function AddTechnicolorProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddTechnicolorProperties.TechnicolorCamera;