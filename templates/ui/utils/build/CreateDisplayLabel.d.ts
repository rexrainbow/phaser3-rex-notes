import SimpleLabel from '../../simplelabel/SimpleLabel.js';

export default CreateDisplayLabel;

declare namespace CreateDisplayLabel {
    interface IConfig extends SimpleLabel.IConfig {

    }
}

declare function CreateDisplayLabel(
    scene: Phaser.Scene,
    config?: SimpleLabel.IConfig
): SimpleLabel;