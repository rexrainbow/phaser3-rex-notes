import Text from '../textbase/Text';

export default BBCodeText;

declare namespace BBCodeText {

    interface TextStyle extends Text.TextStyle {
        /**
         * BBCode tag delimiters.
         */
        delimiters?: string | string[];
    }
}

/**
 * BBCode text game object rendered on a canvas.
 *
 * Supported tag formats (examples):
 * - Bold: `[b]text[/b]`
 * - Italic: `[i]text[/i]`
 * - Weight: `[weight=700]text[/weight]`
 * - Size: `[size=24]text[/size]`
 * - Family: `[family=Arial]text[/family]`
 * - Color: `[color=red]text[/color]`, `[color=#ff0]text[/color]`, `[color=rgba(255,255,255,1)]text[/color]`
 * - Underline: `[u]text[/u]`, `[u=red]text[/u]`
 * - Strikethrough: `[s]text[/s]`, `[s=red]text[/s]`
 * - Shadow: `[shadow]text[/shadow]`, `[shadow=black]text[/shadow]`
 * - Stroke: `[stroke]text[/stroke]`, `[stroke=black]text[/stroke]`
 * - Background color: `[bgcolor=#000]text[/bgcolor]`
 * - Y offset: `[y=10]text[/y]`
 * - Spacing: `[spacing=4]text[/spacing]`
 * - Image: `[img=key]text[/img]`
 * - Area: `[area=name]text[/area]`
 * - URL: `[url=https://example.com]text[/url]`
 * - Align: `[align=center]text[/align]`
 * - Id: `[id=name]text[/id]`
 * - Raw: `[raw]text[/raw]`
 * - Escape: `[esc]text[/esc]`
 * 
 * reference : .\parser\TagRegex.js
 */
declare class BBCodeText extends Text {
    /**
     * Create a BBCode text object.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param text - Text content.
     * @param style - Text style.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        text?: string,
        style?: BBCodeText.TextStyle
    );

    /**
     * Set BBCode tag delimiters.
     * @param delimiterLeft - Left delimiter or list of delimiters.
     * @param delimiterRight - Right delimiter.
     * @returns This instance.
     */
    setDelimiters(
        delimiterLeft: string | string[],
        delimiterRight?: string
    ): this;
}
