import SimpleLabel from '../../simplelabel/SimpleLabel.js';

var CreateDisplayLabel = function (scene, config) {
    var gameObject = new SimpleLabel(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateDisplayLabel;