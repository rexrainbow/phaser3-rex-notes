import FourFacesImageCarousel from './FourFacesImageCarousel.js';

export default function (x, y, config) {
    var gameObject = new FourFacesImageCarousel(this.scene, x, y, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};