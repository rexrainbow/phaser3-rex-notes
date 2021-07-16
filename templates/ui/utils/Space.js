const Zone = Phaser.GameObjects.Zone;
var Space = function (scene) {
    var gameObject = new Zone(scene, 0, 0, 1, 1); // Don't add Zone into scene
    gameObject.isRexSpace = true;
    return gameObject;
}
export default Space;