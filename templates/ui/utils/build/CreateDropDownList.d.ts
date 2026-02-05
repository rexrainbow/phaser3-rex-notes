import DropDownList from '../../dropdownlist/DropDownList';
import BuildListConfig from './BuildListConfig';

/**
 * Create a drop-down list game object from list builder configuration.
 *
 * @param scene - The Phaser scene that owns the created drop-down list object.
 * @param config - Optional list configuration used to build the drop-down list.
 * @param deepCloneConfig - Set to true to deep-clone the configuration before use.
 * @returns The created drop-down list game object.
 */
declare function CreateDropDownList(
    scene: Phaser.Scene,
    config?: BuildListConfig.IConfig,
    deepCloneConfig?: boolean,
): DropDownList;

export default CreateDropDownList;
