// import * as Phaser from 'phaser';
import TextBox from '../textbox/TextBox';
import SimpleTitleLabel from '../simpletitlelabel/SimpleTitleLabel';

export default SimpleTextBox;

declare namespace SimpleTextBox {
    /**
     * Configuration options for creating a simple text box.
     */
    interface IConfig extends TextBox.IConfig {
    }

    /**
     * Factory callbacks used to create text box sub-objects.
     */
    interface ICreatorsConfig extends SimpleTitleLabel.ICreatorsConfig {
    }
}

/**
 * Text box with simplified title-label creator configuration.
 */
declare class SimpleTextBox extends TextBox {
    /**
     * Create a simple text box component.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional text box configuration.
     * @param creators - Optional custom creators for sub-objects.
     */
    constructor(
        scene: Phaser.Scene,
        config?: SimpleTextBox.IConfig,
        creators?: SimpleTextBox.ICreatorsConfig
    );

}
