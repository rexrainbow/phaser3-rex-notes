// import * as Phaser from 'phaser';
import {
    ToonifyFilter,
    ToonifyController
} from './toonifyfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default ToonifyFilterPlugin;

declare namespace ToonifyFilterPlugin {
}

declare class ToonifyFilterPlugin extends FilterPluginBase<ToonifyController, ToonifyController.IConfig> {
}