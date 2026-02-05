export default Space;

/**
 * Lightweight spacer object used by UI layout containers.
 */
declare class Space {
    /**
     * Create a spacer object.
     *
     * @param scene - Scene that owns this spacer.
     */
    constructor(scene: Phaser.Scene);
    /**
     * Type marker indicating this object is a rex space element.
     */
    isRexSpace: true;
}
