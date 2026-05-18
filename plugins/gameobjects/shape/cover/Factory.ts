import Cover from './Cover';

export default function(config?: any) {
    var gameObject = new Cover(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};