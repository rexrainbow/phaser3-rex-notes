import { GameObjects as PhaserGameObjects } from 'phaser';
const PhaserText = PhaserGameObjects.Text;

var CreateBuiltInText = function (scene, style) {
    var gameObject = new PhaserText(scene, 0, 0, '', style);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateBuiltInText;