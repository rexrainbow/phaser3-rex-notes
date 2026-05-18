import BuildListConfig from './BuildListConfig';
import DropDownList from '../../dropdownlist/DropDownList';

var CreateDropDownList = function(scene?: any, config?: any) {
    config = BuildListConfig(scene, config);
    var gameObject = new DropDownList(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateDropDownList;