import LazyLoadImageBox from './LazyLoadImageBox';

export default function(config?: any) {
    var gameObject = new LazyLoadImageBox(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};