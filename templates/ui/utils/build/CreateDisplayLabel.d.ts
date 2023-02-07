import Label from '../../label/Label';
import BuildDisplayLabelConfig from './BuildDisplayLabelConfig';

export default CreateDisplayLabel;

declare namespace CreateDisplayLabel {
    interface IConfig extends BuildDisplayLabelConfig.IConfig {

    }
}

declare function CreateDisplayLabel(
    scene: Phaser.Scene,
    config?: CreateDisplayLabel.IConfig
): Label;