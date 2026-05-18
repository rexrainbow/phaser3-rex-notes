import Line from './Line';

export default function(config?: any) {
    var gameObject = new Line(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
}