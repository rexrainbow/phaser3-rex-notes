import PerspectiveCard from './PerspectiveCard.js';

export default function (x, y, frontKey, frontFrame, config) {
    var gameObject = new PerspectiveCard(this.scene, x, y, frontKey, frontFrame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};