import YoutubePlayer from './YoutubePlayer.js';

export default function (x, y, width, height, config) {
    var gameObject = new YoutubePlayer(this.scene, x, y, width, height, config);
    this.displayList.add(gameObject);
    return gameObject;
}