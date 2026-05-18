import BBCodeText from '../../bbcodetext/BBCodeText';

var CreateBBCodeText = function(scene?: any, style?: any) {
    var gameObject = new BBCodeText(scene, 0, 0, '', style);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateBBCodeText;