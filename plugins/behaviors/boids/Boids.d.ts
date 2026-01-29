import ComponentBase from '../../utils/componentbase/ComponentBase';

export default Boids;

declare namespace Boids {

    /**
     * Boids configuration.
     */
    interface IConfig {
        /**
         * Separation behavior parameters.
         */
        separation?: {
            /**
             * Separation weight.
             */
            weight?: number,
            /**
             * Separation distance.
             */
            distance?: number,
        },

        /**
         * Cohesion behavior parameters.
         */
        cohesion?: {
            /**
             * Cohesion weight.
             */
            weight?: number,
            /**
             * Cohesion distance.
             */
            distance?: number,
        },

        /**
         * Alignment behavior parameters.
         */
        alignment?: {
            /**
             * Alignment weight.
             */
            weight?: number,
            /**
             * Alignment distance.
             */
            distance?: number,
        },
    }
}

/**
 * Boids steering behavior component.
 */
declare class Boids extends ComponentBase {
    /**
     * Create a Boids component.
     * @param gameObject - Target game object.
     * @param config - Boids configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Boids.IConfig
    );

    /**
     * Output steering vector.
     */
    readonly output: Phaser.Math.Vector2;

    /**
     * Set separation parameters.
     * @param weight - Separation weight.
     * @param distance - Separation distance.
     * @returns This instance.
     */
    setSeparationParameters(weight: number, distance: number): this;
    /**
     * Set cohesion parameters.
     * @param weight - Cohesion weight.
     * @param distance - Cohesion distance.
     * @returns This instance.
     */
    setCohesionParameters(weight: number, distance: number): this;
    /**
     * Set alignment parameters.
     * @param weight - Alignment weight.
     * @param distance - Alignment distance.
     * @returns This instance.
     */
    setAlignmentParameters(weight: number, distance: number): this;

    /**
     * Update steering based on neighbors.
     * @param neighbors - Neighbor game objects.
     * @returns This instance.
     */
    update(neighbors: Phaser.GameObjects.GameObject[]): this;
}
