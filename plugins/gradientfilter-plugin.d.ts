// import * as Phaser from 'phaser';
import {
    GradientFilter,
    GradientController
} from './gradientfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default GradientFilterPlugin;

declare namespace GradientFilterPlugin {
}

declare class GradientFilterPlugin extends FilterPluginBase<GradientController, GradientController.IConfig> {
}