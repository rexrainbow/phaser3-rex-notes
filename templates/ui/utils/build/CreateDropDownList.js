import DropDownList from '../../dropdownlist/DropDownList.js';

var CreateDropDownList = function (scene, config) {
    var gameObject = new DropDownList(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateDropDownList;