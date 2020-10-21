import Container from '../../containerlite/ContainerLite.js';
import CreatePerspectiveObject from '../utils/CreatePerspectiveObject.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;

const RAD180 = DegToRad(180);

import Layout from './Layout';

class Carousel extends Container {
    constructor(scene, x, y, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
        }

        var faces = GetValue(config, 'faces', undefined);
        if (!faces) {
            faces = [];
        }

        var width = GetValue(config, 'width');
        var height = GetValue(config, 'height');

        super(scene, x, y, width, height);
        this.type = 'rexPerspectiveCarousel';

        this.addMultiple(faces);
        this.faces = faces;

        this.faceRadius = 0;
        this.faceAngle = 0;

        Layout(this);
    }

}

export default Carousel;