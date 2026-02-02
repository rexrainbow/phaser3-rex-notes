// import * as Phaser from 'phaser';
import {
    CircleFilter,
    CircleController
} from './circlefilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default CircleFilterPlugin;

/**
 * Circle filter plugin declarations.
 */
declare namespace CircleFilterPlugin {
}

/**
 * Plugin that registers circle filter support.
 */
declare class CircleFilterPlugin extends FilterPluginBase<CircleController, CircleController.IConfig> {
}
