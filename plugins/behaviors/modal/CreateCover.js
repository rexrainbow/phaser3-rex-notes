import Cover from '../../gameobjects/shape/cover/Cover.js';

var CreateCover = function (gameObject, config) {
    var scene = gameObject.scene;
    var cover = new Cover(scene, config);
    scene.add.existing(cover);

    // Put cover behind game object
    if (gameObject.isRexContainerLite) {
        gameObject.pin(cover, {
            syncPosition: false,
            syncRotation: false,
            syncScale: false,
            syncAlpha: false,
            syncScrollFactor: false
        });
        if (gameObject.hasLayer()) {
            gameObject.addToRenderLayer(cover);
        }
        gameObject.sendChildToBack(cover);
    } else {
        scene.children.moveBelow(cover, gameObject);
    }
    return cover;
}

export default CreateCover;