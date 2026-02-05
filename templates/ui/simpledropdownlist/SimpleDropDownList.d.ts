import DropDownList from '../dropdownlist/DropDownList';
import BuildListConfig from '../utils/build/BuildListConfig';

export default SimpleDropDownList;

declare namespace SimpleDropDownList {
    /**
     * Configuration options for creating a simple dropdown list.
     */
    interface IConfig extends BuildListConfig.IConfig {
    }

    /**
     * Factory callbacks used to create list sub-objects.
     */
    interface ICreatorsConfig extends BuildListConfig.ICreators {
    }
}

/**
 * Dropdown list with simplified build configuration and creators.
 */
declare class SimpleDropDownList extends DropDownList {
    /**
     * Create a simple dropdown list component.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional dropdown list configuration.
     * @param creators - Optional custom creators for list sub-objects.
     */
    constructor(
        scene: Phaser.Scene,
        config?: SimpleDropDownList.IConfig,
        creators?: SimpleDropDownList.ICreatorsConfig
    );
}
