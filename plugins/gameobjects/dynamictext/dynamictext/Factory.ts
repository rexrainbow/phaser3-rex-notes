import DynamicText from './DynamicText'

export default function(x?: any, y?: any, width?: any, height?: any, config?: any) {
    var gameObject = new DynamicText(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};