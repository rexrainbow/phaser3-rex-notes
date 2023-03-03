import SimpleLabel from '../../simplelabel/SimpleLabel.js';

var CreateDisplayLabel = function (scene, config, creators) {
    var gameObject = new SimpleLabel(scene, config, creators);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateDisplayLabel;