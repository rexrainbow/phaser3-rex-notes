export default AddRevealProperties;

declare namespace AddRevealProperties {
    interface Reveal {
        revealLeft: number | null | false;
        revealRight: number | null | false;
        revealUp: number | null | false;
        revealDown: number | null | false;
        revealWidth: number;
    }

    interface RevealGameObject extends Reveal, Phaser.GameObjects.GameObject {
    }

    interface RevealCamera extends Reveal, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddRevealProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddRevealProperties.RevealGameObject;

declare function AddRevealProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddRevealProperties.RevealCamera;