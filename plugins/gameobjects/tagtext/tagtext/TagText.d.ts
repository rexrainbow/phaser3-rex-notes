import Text from '../textbase/Text';

export default TagText;

declare namespace TagText {

    interface TagProg {
        /**
         * Fill color.
         */
        color?: string,

        stroke?: {
            /**
             * Stroke color.
             */
            color?: string,
            /**
             * Stroke thickness.
             */
            thickness?: number,
        },

        /**
         * Font size value.
         */
        fontSize?: string,
        /**
         * Font family name.
         */
        fontFamily?: string,
        /**
         * Font style string.
         */
        fontStyle?: string,

        shadow?: {
            /**
             * Shadow color.
             */
            color?: string,
            /**
             * Shadow offset x.
             */
            offsetX?: number,
            /**
             * Shadow offset y.
             */
            offsetY?: number,
            /**
             * Shadow blur.
             */
            blur?: number,
        },

        underline?: {
            /**
             * Underline color.
             */
            color?: string,
            /**
             * Underline thickness.
             */
            thickness?: number,
            /**
             * Underline offset.
             */
            offset?: number,
        },

        /**
         * Vertical offset.
         */
        y?: number,

        /**
         * Inline image key.
         */
        img?: string,

        /**
         * Interactive area key.
         */
        area?: string,

        /**
         * URL value for url tags.
         */
        url?: string,
    }

    interface TextStyle extends Text.TextStyle {
        /**
         * Tag style definitions.
         */
        tags?: {
            [name: string]: TagProg
        }
    }

}

/**
 * Tag text game object rendered on a canvas.
 *
 * Supported tag formats (examples):
 * - Class tag: `<class='warning'>text</class>`
 * - Style tag: `<style='size:24;color:red;stroke:blue 1px'>text</style>`
 * - Style tag with shadow: `<style='shadow:black 2px 2px 2px'>text</style>`
 * - Style tag with underline: `<style='underline:blue 3px -1px'>text</style>`
 * - Style tag with strikethrough: `<style='strikethrough:blue 3px -1px'>text</style>`
 * - Style tag with y offset: `<style='y:10'>text</style>`
 * - Style tag with spacing: `<style='spacing:2'>text</style>`
 */
declare class TagText extends Text {
    /**
     * Create a tag text object.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param content - Text content.
     * @param style - Text style.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        content?: string,
        style?: TagText.TextStyle
    );

    /**
     * Add a tag style definition.
     * @param name - Tag name.
     * @param prop - Tag style definition.
     * @returns This instance.
     */
    addTag(
        name: string,
        prop: TagText.TagProg
    ): this;

    /**
     * Add multiple tag style definitions.
     * @param tags - Tag style definitions.
     * @returns This instance.
     */
    addTags(
        tags: { [name: string]: TagText.TagProg }
    ): this;
}
