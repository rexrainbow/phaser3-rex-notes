import PersistenceEffect from './PersistenceEffect.js';

export default function (texture, frame, config) {
    var gameObject = new PersistenceEffect(this.scene, texture, frame, config);
    this.displayList.add(gameObject);
    return gameObject;
};