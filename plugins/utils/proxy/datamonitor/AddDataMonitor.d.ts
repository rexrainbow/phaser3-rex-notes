import EventEmitter from 'eventemitter3';

/**
 * Add data monitoring via proxy and event emission.
 *
 * @param config - Monitor configuration.
 * @returns Proxied data object.
 */
export default function AddDataMonitor<T>(config: {
    /**
     * Source data object.
     */
    data?: T,
    /**
     * Event emitter instance.
     */
    eventEmitter: EventEmitter,
    /**
     * Event name overrides.
     */
    eventNames?: {
        /**
         * Event name for added key.
         */
        addKey?: string,
        /**
         * Event name for set key.
         */
        setKey?: string,
        /**
         * Event name for deleted key.
         */
        deleteKey?: string
    },
    /**
     * Parent path prefix.
     */
    parentPath?: string,
}): T;

