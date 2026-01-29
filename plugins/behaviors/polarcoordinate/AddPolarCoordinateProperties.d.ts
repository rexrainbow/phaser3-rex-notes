export default AddPolarCoordinateProperties;

declare namespace AddPolarCoordinateProperties {
    /**
     * Game object with polar coordinate properties.
     */
    interface PolarCoordinateGameObject extends Phaser.GameObjects.GameObject {
        /**
         * Polar origin x.
         */
        polarOX: number;
        /**
         * Polar origin y.
         */
        polarOY: number;
        /**
         * Polar rotation in radians.
         */
        polarRotation: number;
        /**
         * Polar angle in radians.
         */
        polarAngle: number;
        /**
         * Polar radius.
         */
        polarRadius: number;
    }
}

/**
 * Add polar coordinate properties to a game object.
 * @param gameObject - Target game object.
 * @param ox - Origin x.
 * @param oy - Origin y.
 * @param rotation - Rotation in radians.
 * @param radius - Radius value.
 * @returns Game object with polar properties.
 */
declare function AddPolarCoordinateProperties(
    gameObject: Phaser.GameObjects.GameObject,
    ox?: number,
    oy?: number,
    rotation?: number,
    radius?: number
): AddPolarCoordinateProperties.PolarCoordinateGameObject;
