import TitleLabel from '../../gameobjects/label/Title';

var CreateTitleLabel = function(scene?: any, config?: any, style?: any) {
    var gameObject = new TitleLabel(scene, style);
    scene.add.existing(gameObject);

    return gameObject;
}

export default CreateTitleLabel;