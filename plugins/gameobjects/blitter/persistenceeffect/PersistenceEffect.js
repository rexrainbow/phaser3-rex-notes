const Blitter = Phaser.GameObjects.Blitter;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class PersistenceEffect extends Blitter {
    constructor(scene, texture, frame, config) {
        if (IsPlainObject(texture)) {
            config = texture;
            texture = GetValue(config, 'key', undefined);
            frame = GetValue(config, 'frame', undefined);
        } else if (IsPlainObject(frame)) {
            config = frame;
            frame = GetValue(config, 'frame', undefined);
        }

        super(scene, 0, 0, texture, frame);

        this.reuseBob = GetValue(config, 'reuseBob', true);
        this.setDefaultLifeSpan(GetValue(config, 'lifespan', 1000));
        this.setDefaultAlphaStart(GetValue(config, 'alphaStart', 1));
        this.aliveCount = 0;
    }

    preUpdate(time, delta) {
        this.fadeOutBobs(time, delta);
    }

    fadeOutBobs(time, delta) {
        if (this.aliveCount === 0) {
            return;
        }

        var bobs = this.children.list;
        var bob, data;
        for (var i = bobs.length - 1; i >= 0; i--) { // From last to first
            bob = bobs[i];

            // Skip dead bob    
            if (this.reuseBob &&
                (!bob.visible)) {
                continue;
            }

            data = bob.data;
            data.lifeCurr -= delta;
            if (data.lifeCurr <= 0) {
                // Kill bob
                if (this.reuseBob) {
                    bob.alpha = 0;
                    bob.visible = false;
                } else {
                    bob.destroy();
                }
                this.aliveCount--;
            } else {
                bob.alpha = data.alphaStart * (data.lifeCurr / data.life);
            }
        }
    }

    setDefaultLifeSpan(lifespan) {
        this.lifespan = lifespan;
        return this;
    }

    setDefaultAlphaStart(alphaStart) {
        this.alphaStart = alphaStart;
        return this;
    }

    paste(x, y, lifespan, alphaStart, frame) {
        if (lifespan === undefined) {
            lifespan = this.lifespan;
        }
        if (alphaStart === undefined) {
            alphaStart = this.alphaStart;
        }

        var bob;
        if (this.reuseBob) {
            bob = this.children.getFirst('visible', false); // Get first dead bob
        }
        if (bob) {
            this.children.bringToTop(bob);
            bob.reset(x, y, frame);
        } else {
            bob = this.create(x, y, frame);
        }
        bob.alpha = alphaStart;
        this.aliveCount++;

        var data = bob.data;
        data.life = lifespan;
        data.lifeCurr = lifespan;
        data.alphaStart = alphaStart;

        return this;
    }
};
export default PersistenceEffect;