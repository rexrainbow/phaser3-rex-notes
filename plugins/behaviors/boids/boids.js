import AddSeparationForce from './AddSeparationForce.js';
import AddAlignmentForce from './AddAlignmentForce.js';
import AddCohesionForce from './AddCohesionForce.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Vector2 = Phaser.Math.Vector2;

class Boids {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.output = new Vector2();
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setSeparationParameters(GetValue(o, 'separation.weight', 0), GetValue(o, 'separation.distance', Infinity));
        this.setCohesionParameters(GetValue(o, 'cohesion.weight', 0), GetValue(o, 'cohesion.distance', Infinity));
        this.setAlignmentParameters(GetValue(o, 'alignment.weight', 0), GetValue(o, 'alignment.distance', Infinity));
        return this;
    }

    boot() {
        if (this.gameObject.once) { // oops, bob object does not have event emitter
            this.gameObject.once('destroy', this.destroy, this);
        }
    }

    shutdown() {
        this.output = undefined;
        this.gameObject = undefined;
        // gameObject events will be removed when this gameObject destroyed 
    }

    destroy() {
        this.shutdown();
    }

    setSeparationParameters(weight, distance) {
        this.separationWeight = weight;
        this.separationDistance = distance;
        return this;
    }

    setCohesionParameters(weight, distance) {
        this.cohesionWeight = weight;
        this.cohesionDistance = distance;
        return this;
    }

    setAlignmentParameters(weight, distance) {
        this.alignmentWeight = weight;
        this.alignmentDistance = distance;
        return this;
    }

    update(neighbors) {
        this.output.reset();
        AddSeparationForce(this.gameObject, neighbors, this.separationWeight, this.separationDistance, this.output);
        AddCohesionForce(this.gameObject, neighbors, this.cohesionWeight, this.cohesionDistance, this.output);
        AddAlignmentForce(this.gameObject, neighbors, this.alignmentWeight, this.alignmentDistance, this.output);
        return this;
    }

    addSeparationForce(neighbors, separationWeight, separationDistance, output) {
        if (separationWeight === undefined) {
            separationWeight = this.separationWeight;
        }
        if (separationDistance === undefined) {
            separationDistance = this.separationDistance;
        }
        AddSeparationForce(this.gameObject, neighbors, separationWeight, separationDistance, output);
        return this;
    }

    addAlignmentForce(neighbors, alignmentWeight, output) {
        if (alignmentWeight === undefined) {
            alignmentWeight = this.alignmentWeight;
        }
        AddAlignmentForce(this.gameObject, neighbors, alignmentWeight, output);
        return this;
    }

    addCohesionForce(neighbors, cohesionWeight, cohesionDistance, output) {
        if (cohesionWeight === undefined) {
            cohesionWeight = this.cohesionWeight;
        }
        if (cohesionDistance === undefined) {
            cohesionDistance = this.cohesionDistance;
        }
        AddCohesionForce(this.gameObject, neighbors, cohesionWeight, cohesionDistance, output);
        return this;
    }
}

export default Boids;