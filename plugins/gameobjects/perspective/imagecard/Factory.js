import ImageCard from './ImageCard.js';

export default function (x, y, config) {
    var gameObject = new ImageCard(this.scene, x, y, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};