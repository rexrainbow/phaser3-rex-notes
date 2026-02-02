// import * as Phaser from 'phaser';
import {
    ShineFilter,
    ShineController
} from './shinefilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default ShineFilterPlugin;

/**
 * Shine filter plugin declarations.
 */
declare namespace ShineFilterPlugin {
}

/**
 * Plugin that registers shine filter support.
 */
declare class ShineFilterPlugin extends FilterPluginBase<ShineController, ShineController.IConfig> {
}
