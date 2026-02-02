// import * as Phaser from 'phaser';
import {
    WipeFilter,
    WipeController
} from './wipefilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default WipeFilterPlugin;

/**
 * Wipe filter plugin declarations.
 */
declare namespace WipeFilterPlugin {
}

/**
 * Plugin that registers wipe filter support.
 */
declare class WipeFilterPlugin extends FilterPluginBase<WipeController, WipeController.IConfig> {
}
