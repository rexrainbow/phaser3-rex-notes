import SimpleLabel from '../../simplelabel/SimpleLabel';

var CreateLabel = function(scene?: any, config?: any, creators?: any) {
    var gameObject = new SimpleLabel(scene, config, creators);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateLabel;