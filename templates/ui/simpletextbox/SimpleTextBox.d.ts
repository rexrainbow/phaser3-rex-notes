// import * as Phaser from 'phaser';
import TextBox from '../textbox/TextBox';
import SimpleTitleLabel from '../simpletitlelabel/SimpleTitleLabel';

export default SimpleTextBox;

declare namespace SimpleTextBox {
    interface IConfig extends TextBox.IConfig {
    }

    interface ICreatorsConfig extends SimpleTitleLabel.ICreatorsConfig {
    }
}

declare class SimpleTextBox extends TextBox {
    constructor(
        scene: Phaser.Scene,
        config?: SimpleTextBox.IConfig,
        creators?: SimpleTextBox.ICreatorsConfig
    );

}