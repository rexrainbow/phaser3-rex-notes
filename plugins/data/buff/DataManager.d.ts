export default class DataManager extends Phaser.Data.DataManager {
    /**
     * Create a buff-enabled data manager.
     *
     * @param parent - Parent object that owns this data manager.
     * @param eventEmitter - Optional event emitter used by this data manager.
     */
    constructor(
        parent: object,
        eventEmitter?: Phaser.Events.EventEmitter,
    );

    /**
     * Set the base numeric value of a key.
     *
     * @param key - Data key to update.
     * @param value - Base numeric value before buffs.
     * @returns This data manager instance.
     */
    setBaseValue(
        key: string,
        value: number
    ): this;

    /**
     * Remove the base value of a key.
     *
     * @param key - Data key to clear.
     * @returns This data manager instance.
     */
    removeBaseValue(key: string): this;

    /**
     * Get the base numeric value of a key.
     *
     * @param key - Data key to query.
     * @returns Base numeric value.
     */
    getBaseValue(key: string): number;

    /**
     * Set a buff value on a key.
     *
     * @param key - Data key affected by the buff.
     * @param buffKey - Identifier of the buff entry.
     * @param value - Buff expression or numeric value.
     * @returns This data manager instance.
     */
    setBuff(
        key: string,
        buffKey: string,
        value: number | string
    ): this;

    /**
     * Remove a buff value from a key.
     *
     * @param key - Data key affected by the buff.
     * @param buffKey - Identifier of the buff entry.
     * @returns This data manager instance.
     */
    removeBuff(
        key: string,
        buffKey: string
    ): this;

    /**
     * Get the resolved numeric value of a buff entry.
     *
     * @param key - Data key affected by the buff.
     * @param buffKey - Identifier of the buff entry.
     * @returns Numeric value of the buff entry.
     */
    getBuffValue(
        key: string,
        buffKey: string
    ): number;

    /**
     * Set the minimum bound of a key.
     *
     * @param key - Data key to constrain.
     * @param min - Minimum allowed value.
     * @returns This data manager instance.
     */
    setMin(
        key: string,
        min: number
    ): this;

    /**
     * Set the maximum bound of a key.
     *
     * @param key - Data key to constrain.
     * @param max - Maximum allowed value.
     * @returns This data manager instance.
     */
    setMax(
        key: string,
        max: number
    ): this;

    /**
     * Set both minimum and maximum bounds of a key.
     *
     * @param key - Data key to constrain.
     * @param min - Minimum allowed value.
     * @param max - Maximum allowed value.
     * @returns This data manager instance.
     */
    setBounds(
        key: string,
        min: number,
        max: number
    ): this;

    /**
     * Get the minimum bound of a key.
     *
     * @param key - Data key to query.
     * @returns Minimum bound value.
     */
    getMinBound(key: string): number;

    /**
     * Get the maximum bound of a key.
     *
     * @param key - Data key to query.
     * @returns Maximum bound value.
     */
    getMaxBound(key: string): number;

}
