import DataManager from './DataManager';

/**
 * Extend a Phaser DataManager with local-storage features.
 *
 * @param dataManager - Source DataManager instance.
 * @param config - Configuration options.
 * @returns The extended DataManager instance.
 */
export default function Extend(
    dataManager: Phaser.Data.DataManager,
    config?: DataManager.IConfig
): DataManager;
