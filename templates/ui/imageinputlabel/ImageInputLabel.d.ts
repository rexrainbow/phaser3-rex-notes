import Label from '../label/Label';

export default ImageInputLabel;

declare namespace ImageInputLabel {
    /**
     * Configuration options for creating an image input label.
     */
    interface IConfig extends Label.IConfig {
        /**
         * Optional background object behind icon area.
         */
        iconBackground?: Phaser.GameObjects.GameObject,

        canvas?: {
            /**
             * Canvas width.
             */
            width?: number,
            /**
             * Canvas height.
             */
            height?: number,
            /**
             * Canvas fill color.
             */
            fill?: string,
            /**
             * Texture key used for generated canvas texture.
             */
            key?: string,
            /**
             * Texture frame used for generated canvas texture.
             */
            frame?: string,
        },

        /**
         * Set to true to scale icon up to fit target area.
         */
        scaleUpIcon?: boolean,

        /**
         * Target object or key used to trigger open action.
         */
        clickTarget?: string | Phaser.GameObjects.GameObject | null,

        /**
         * Set to true to use DOM button for file input.
         */
        domButton?: boolean,
    }

}

/**
 * Label component that lets users pick an image file and preview it.
 */
declare class ImageInputLabel extends Label {
    /**
     * Create an image input label.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional component configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: ImageInputLabel.IConfig
    );

    /**
     * Open file chooser dialog.
     *
     * @returns This component instance.
     */
    open(): this;

    /**
     * Open file chooser dialog and return selected file.
     *
     * @returns Promise resolved with selected file.
     */
    openPromise(): Promise<File>;

    /**
     * Save current preview image as texture.
     *
     * @param key - Texture key to save.
     * @returns This component instance.
     */
    saveTexture(key: string): this;

    /**
     * Get display name of a file.
     *
     * @param file - File object.
     * @returns File name string.
     */
    getFileName(file: File): string;

    /**
     * Enable or disable click-to-open behavior.
     *
     * @param enable - True to enable click open.
     * @returns This component instance.
     */
    setClickOpenEnable(enable?: boolean): this;

}
