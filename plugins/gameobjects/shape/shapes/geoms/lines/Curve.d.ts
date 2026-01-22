// import * as Phaser from 'phaser';
import PathBase from "./PathBase";

/**
 * Curve path geometry.
 */
export default class Curve extends PathBase {
    /**
     * Create a curve geometry.
     * @param curve - Phaser curve instance.
     */
    constructor(
        curve: Phaser.Curves.Curve
    );

    /**
     * Set curve instance.
     * @param curve - Phaser curve instance.
     * @returns This instance.
     */
    setCurve(curve: Phaser.Curves.Curve): this;
    /**
     * Curve instance.
     */
    curve: Phaser.Curves.Curve;

    /**
     * Set iteration count.
     * @param iterations - Iteration count.
     * @returns This instance.
     */
    setIterations(iterations: number): this;
    /**
     * Iteration count.
     */
    iterations: number;

}
