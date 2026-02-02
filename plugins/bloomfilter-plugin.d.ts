// import * as Phaser from 'phaser';
import {
    BloomFilter,
    BloomController
} from './bloomfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default BloomFilterPlugin;

/**
 * Bloom filter plugin declarations.
 */
declare namespace BloomFilterPlugin {
}

/**
 * Plugin that registers bloom filter support.
 */
declare class BloomFilterPlugin extends FilterPluginBase<BloomController, BloomController.IConfig> {
}
