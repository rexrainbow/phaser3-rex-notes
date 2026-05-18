import ToggleSwitchShape from './ToggleSwitchShape';

export default function(x?: any, y?: any, width?: any, height?: any, color?: any, config?: any) {
    var gameObject = new ToggleSwitchShape(this.scene, x, y, width, height, color, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};