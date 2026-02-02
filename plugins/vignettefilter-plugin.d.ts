// import * as Phaser from 'phaser';
import {
    VignetteFilter,
    VignetteController
} from './vignettefilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default VignetteFilterPlugin;

/**
 * Vignette filter plugin declarations.
 */
declare namespace VignetteFilterPlugin {
}

/**
 * Plugin that registers vignette filter support.
 */
declare class VignetteFilterPlugin extends FilterPluginBase<VignetteController, VignetteController.IConfig> {
}
