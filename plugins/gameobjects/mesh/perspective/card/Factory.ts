import Card from './Card';

export default function(x?: any, y?: any, config?: any) {
    var gameObject = new Card(this.scene, x, y, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};