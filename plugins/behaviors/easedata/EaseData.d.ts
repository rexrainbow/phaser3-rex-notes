import ComponentBase from '../../utils/componentbase/ComponentBase';

export default EaseData;

declare namespace EaseData {
    /**
     * EaseData configuration.
     */
    interface IConfig extends ComponentBase.IConfig {
    }
}

/**
 * Ease data component for smooth property changes.
 */
declare class EaseData extends ComponentBase {
    /**
     * Ease a property to a value.
     * @param key - Data key.
     * @param value - Target value.
     * @param duration - Duration in ms.
     * @param ease - Ease name.
     * @returns This instance.
     */
    easeTo(
        key: string,
        value: number,
        duration?: number,
        ease?: string
    ): this;

    /**
     * Ease a property to a value.
     * @param config - Ease configuration.
     * @returns This instance.
     */
    easeTo(
        config: {
            /**
             * Data key.
             */
            key: string,
            /**
             * Target value.
             */
            value: number,
            /**
             * Duration in ms.
             */
            duration?: number,
            /**
             * Ease name.
             */
            ease?: string,
            /**
             * Speed value.
             */
            speed?: number
        }
    ): this;

    /**
     * Ease a property from a value.
     * @param key - Data key.
     * @param value - Start value.
     * @param duration - Duration in ms.
     * @param ease - Ease name.
     * @returns This instance.
     */
    easeFrom(
        key: string,
        value: number,
        duration?: number,
        ease?: string
    ): this;

    /**
     * Ease a property from a value.
     * @param config - Ease configuration.
     * @returns This instance.
     */
    easeFrom(
        config: {
            /**
             * Data key.
             */
            key: string,
            /**
             * Start value.
             */
            value: number,
            /**
             * Duration in ms.
             */
            duration?: number,
            /**
             * Ease name.
             */
            ease?: string,
            /**
             * Speed value.
             */
            speed?: number
        }
    ): this;

    /**
     * Stop easing a key.
     * @param key - Data key.
     * @param toEnd - True to jump to end.
     * @returns This instance.
     */
    stopEase(
        key: string,
        toEnd?: boolean
    ): this;

    /**
     * Stop all easing.
     * @param toEnd - True to jump to end.
     * @returns This instance.
     */
    stopAll(
        toEnd?: boolean
    ): this;
}
