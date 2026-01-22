import RenderBase from '../renderbase/RenderBase';

/**
 * Image render bob for dynamic text.
 */
export default class ImageData extends RenderBase {
    /**
     * Bob type.
     */
    readonly type: 'image';

    /**
     * Set texture and frame.
     * @param key - Texture key.
     * @param frame - Frame name.
     * @returns This instance.
     */
    setTexture(key: string, frame?: string | null): this;
    /**
     * Texture key.
     */
    key: string;
    /**
     * Frame name.
     */
    frame: string | null;

    /**
     * Frame width.
     */
    readonly frameWidth: number;
    /**
     * Frame height.
     */
    readonly frameHeight: number;

}
