import DropDownList from '../../dropdownlist/DropDownList';
import BuildListConfig from './BuildListConfig';

declare function CreateDropDownList(
    scene: Phaser.Scene,
    config?: BuildListConfig.IConfig,
    deepCloneConfig?: boolean,
): DropDownList;

export default CreateDropDownList;