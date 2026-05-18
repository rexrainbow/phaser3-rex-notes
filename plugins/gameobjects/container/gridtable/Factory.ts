import GridTable from './GridTable';

export default function(x?: any, y?: any, width?: any, height?: any, config?: any) {
    var gameObject = new GridTable(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};