// import * as Phaser from 'phaser';
import {
    GradientFilter,
    GradientController
} from './gradientfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default GradientFilterPlugin;

/**
 * Gradient filter plugin declarations.
 */
declare namespace GradientFilterPlugin {
}

/**
 * Plugin that registers gradient filter support.
 */
declare class GradientFilterPlugin extends FilterPluginBase<GradientController, GradientController.IConfig> {
}
