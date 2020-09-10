import VideoDOM from './VideoDOM.js';

export default function (x, y, width, height, config) {
    var gameObject = new VideoDOM(this.scene, x, y, width, height, config);
    this.displayList.add(gameObject);
    return gameObject;
};