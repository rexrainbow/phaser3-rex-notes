// import * as Phaser from 'phaser';
import {
    VignetteFilter,
    VignetteController
} from './vignettefilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default VignetteFilterPlugin;

declare namespace VignetteFilterPlugin {
}

declare class VignetteFilterPlugin extends FilterPluginBase<VignetteController, VignetteController.IConfig> {
}