import SimpleLabel from '../../simplelabel/SimpleLabel.js';

export default CreateLabel;

declare namespace CreateLabel {
    /**
     * Configuration options for creating a simple label.
     */
    interface IConfig extends SimpleLabel.IConfig {

    }

    /**
     * Factory callbacks used to create label sub-objects.
     */
    interface ICreatorsConfig extends SimpleLabel.ICreatorsConfig {

    }
}

/**
 * Create a `SimpleLabel` from label config and optional creators.
 *
 * @param scene - Scene that owns the created label.
 * @param config - Optional label configuration.
 * @param creators - Optional custom creators for label sub-objects.
 * @returns Created simple label instance.
 */
declare function CreateLabel(
    scene: Phaser.Scene,
    config?: CreateLabel.IConfig,
    creators?: CreateLabel.ICreatorsConfig
): SimpleLabel;
