// import * as Phaser from 'phaser';
import DataMethods from '../../../../utils/data/DataMethods';
import DynamicText from '../DynamicText';

export default class Base extends DataMethods {
    /**
     * Parent dynamic text object.
     */
    parent: DynamicText;
    /**
     * Bob type.
     */
    readonly type: string;
    /**
     * True if renderable.
     */
    readonly renderable: boolean;

    /**
     * Set active state.
     * @param active - True to enable.
     * @returns This instance.
     */
    setActive(active?: boolean): this;
    /**
     * Active state.
     */
    active: boolean;

    /**
     * Set dirty state.
     * @param dirty - True to mark dirty.
     * @returns This instance.
     */
    setDirty(dirty?: boolean): this;

    /**
     * Scene reference.
     */
    scene: Phaser.Scene;
    /**
     * Canvas element.
     */
    canvas: HTMLCanvasElement;
    /**
     * Canvas 2D context.
     */
    context: CanvasRenderingContext2D;

    /**
     * Render the bob.
     */
    render(): void;
    /**
     * Check if a point is inside this bob.
     * @param x - Local x.
     * @param y - Local y.
     * @returns True if contains point.
     */
    contains(x: number, y: number): boolean;
}
