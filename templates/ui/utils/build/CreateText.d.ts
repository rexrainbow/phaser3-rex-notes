export default CreateText;

declare namespace CreateText {
    interface IConfig extends Phaser.GameObjects.TextStyle {

    }
}

declare function CreateText(
    scene: Phaser.Scene,
    config?: CreateText.IConfig
): Phaser.GameObjects.Text;