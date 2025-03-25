// import * as Phaser from 'phaser';
import {
    BloomFilter,
    BloomController
} from './bloomfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default BloomFilterPlugin;

declare namespace BloomFilterPlugin {
}

declare class BloomFilterPlugin extends FilterPluginBase<BloomController, BloomController.IConfig> {
}