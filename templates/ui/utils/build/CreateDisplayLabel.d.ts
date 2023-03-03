import SimpleLabel from '../../simplelabel/SimpleLabel.js';

export default CreateDisplayLabel;

declare namespace CreateDisplayLabel {
    interface IConfig extends SimpleLabel.IConfig {

    }

    interface ICreatorsConfig extends SimpleLabel.ICreatorsConfig {

    }
}

declare function CreateDisplayLabel(
    scene: Phaser.Scene,
    config?: SimpleLabel.IConfig,
    creators?: SimpleLabel.ICreatorsConfig,
): SimpleLabel;