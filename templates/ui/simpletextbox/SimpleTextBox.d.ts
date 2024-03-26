// import * as Phaser from 'phaser';
import TextBox from '../textbox/TextBox';

export default SimpleTextBox;

declare namespace SimpleTextBox {
    interface IConfig extends TextBox.IConfig {
    }
}

declare class SimpleTextBox extends TextBox {
    constructor(
        scene: Phaser.Scene,
        config?: SimpleTextBox.IConfig
    );

}