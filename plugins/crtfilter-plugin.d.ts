// import * as Phaser from 'phaser';
import {
    CrtFilter,
    CrtController
} from './crtfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default CrtFilterPlugin;

declare namespace CrtFilterPlugin {
}

declare class CrtFilterPlugin extends FilterPluginBase<CrtController, CrtController.IConfig> {
}