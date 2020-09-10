import PersistenceEffect from './PersistenceEffect.js';

export default function (texture, frame, config) {
    var gameObject = new PersistenceEffect(this.scene, texture, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};