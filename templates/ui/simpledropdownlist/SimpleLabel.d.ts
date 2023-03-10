import Label from '../label/Label';
import BuildListConfig from '../utils/build/BuildListConfig';

export default SimpleDropDownList;

declare namespace SimpleDropDownList {
    interface IConfig extends BuildListConfig.IConfig {
    }

    interface ICreatorsConfig extends BuildListConfig.ICreators {
    }
}

declare class SimpleDropDownList extends Label {
    constructor(
        scene: Phaser.Scene,
        config?: SimpleDropDownList.IConfig,
        creators?: SimpleDropDownList.ICreatorsConfig
    );
}