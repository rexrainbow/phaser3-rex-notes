import Live2dGameObject from './Live2dGameObject';

export default function(x?: any, y?: any, key?: any, config?: any) {
    var gameObject = new Live2dGameObject(this.scene, x, y, key, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};