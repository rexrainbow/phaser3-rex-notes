import BBCodeText from '../../bbcodetext/BBCodeText';

export default CreateBBCodeText;

declare namespace CreateBBCodeText {
    /**
     * Configuration options for creating a BBCode text object.
     */
    interface IConfig extends BBCodeText.TextStyle {

    }
}

/**
 * Create a BBCode text game object using the provided style configuration.
 *
 * @param scene - The Phaser scene that owns the created text object.
 * @param config - Optional BBCode text style and behavior configuration.
 * @returns The created BBCode text game object.
 */
declare function CreateBBCodeText(
    scene: Phaser.Scene,
    config?: CreateBBCodeText.IConfig
): BBCodeText;
