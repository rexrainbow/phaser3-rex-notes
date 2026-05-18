import ContainerLite from './ContainerLite';

export default function(x?: any, y?: any, width?: any, height?: any, children?: any) {
    var gameObject = new ContainerLite(this.scene, x, y, width, height, children);
    this.scene.add.existing(gameObject);
    return gameObject;
};