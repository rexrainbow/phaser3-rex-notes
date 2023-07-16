export default AddBokehProperties;

declare namespace AddBokehProperties {
    interface Bokeh {
        bokehRadius: number | null | false;
        bokehAmount: number;
        bokehContrast: number;
    }

    interface BokehGameObject extends Bokeh, Phaser.GameObjects.GameObject {
    }

    interface BokehCamera extends Bokeh, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddBokehProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddBokehProperties.BokehGameObject;

declare function AddBokehProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddBokehProperties.BokehCamera;