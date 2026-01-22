import RenderBase from '../renderbase/RenderBase';

/**
 * Drawer render bob for custom drawing.
 */
export default class Drawer extends RenderBase {
    /**
     * Bob type.
     */
    readonly type: 'drawer';

    /**
     * Set render callback.
     * @param callback - Render callback.
     * @returns This instance.
     */
    setRenderCallback(callback?: (this: Drawer) => void): this;

    /**
     * Set drawer size to match all content.
     * @param isAllSize - True to size to all content.
     * @returns This instance.
     */
    setDrawerSize(isAllSize: true): this;
    /**
     * Set drawer size.
     * @param width - Drawer width.
     * @param height - Drawer height.
     * @returns This instance.
     */
    setDrawerSize(width?: number, height?: number): this;
    /**
     * Drawer width.
     */
    readonly drawerWidth: number;
    /**
     * Drawer height.
     */
    readonly drawerHeight: number;

}
