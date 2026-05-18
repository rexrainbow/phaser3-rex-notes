import FullWindowRectangle from './FullWindowRectangle';

export default function(fillColor?: any, fillAlpha?: any) {
    var gameObject = new FullWindowRectangle(this.scene, fillColor, fillAlpha);
    this.scene.add.existing(gameObject);
    return gameObject;
};