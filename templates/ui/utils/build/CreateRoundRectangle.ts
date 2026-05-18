import RoundRectangle from '../../roundrectangle/RoundRectangle';

var CreateRoundRectangle = function(scene?: any, config?: any) {
    var gameObject = new RoundRectangle(scene, config);
    scene.add.existing(gameObject);

    return gameObject;
}

export default CreateRoundRectangle;