// import * as Phaser from 'phaser';
import {
    ShineFilter,
    ShineController
} from './shinefilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default ShineFilterPlugin;

declare namespace ShineFilterPlugin {
}

declare class ShineFilterPlugin extends FilterPluginBase<ShineController, ShineController.IConfig> {
}