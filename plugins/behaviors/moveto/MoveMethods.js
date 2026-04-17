const DistanceBetween = Phaser.Math.Distance.Between;
const Lerp = Phaser.Math.Linear;
const AngleBetween = Phaser.Math.Angle.Between;

const ArriveEpsilon = 0.0001;

export default {

    shouldContinueAfterComplete() {
        if (
            (!this.continueAfterComplete) ||
            (!this.isRunning) ||
            (!this.enable) ||
            this.isCompleted ||
            (this.targetX == null) ||
            (this.targetY == null)
        ) {
            return false;
        }

        var gameObject = this.parent;
        if ((!gameObject) || (!gameObject.active)) {
            return false;
        }

        return (DistanceBetween(gameObject.x, gameObject.y, this.targetX, this.targetY) > ArriveEpsilon);
    },


    update(time, delta) {
        if ((!this.isRunning) || (!this.enable)) {
            return this;
        }

        if (this.targetX == null || this.targetY == null) {
            this.stop();
            return this;
        }

        var gameObject = this.parent;
        if (!gameObject.active) {
            return this;
        }

        if ((this.speed === 0) || (delta === 0) || (this.timeScale === 0)) {
            return this;
        }

        var deltaSeconds = (delta * this.timeScale) / 1000;
        var remainingDistanceBudget = this.speed * deltaSeconds;

        // Consume remainingDistanceBudget across multiple targets in the same tick
        while (remainingDistanceBudget > 0) {
            var currentX = gameObject.x;
            var currentY = gameObject.y;

            var targetX = this.targetX;
            var targetY = this.targetY;

            var distanceToTarget = DistanceBetween(currentX, currentY, targetX, targetY);

            // If already on the current target, switch to next target or complete
            if (distanceToTarget <= ArriveEpsilon) {
                if (this.targets.length > 0) {
                    var nextTarget = this.targets.shift();
                    this.targetX = nextTarget.x;
                    this.targetY = nextTarget.y;
                    continue;
                }

                this.complete();
                if (this.shouldContinueAfterComplete()) {
                    continue;
                }
                return this;
            }

            // Move partially toward target
            else if (remainingDistanceBudget < distanceToTarget) {
                var t = remainingDistanceBudget / distanceToTarget;
                var newX = Lerp(currentX, targetX, t);
                var newY = Lerp(currentY, targetY, t);

                gameObject.setPosition(newX, newY);

                if (this.rotateToTarget) {
                    gameObject.rotation = AngleBetween(currentX, currentY, newX, newY);
                }

                remainingDistanceBudget = 0;
                return this;
            }

            // (remainingDistanceBudget >= distanceToTarget) : Reach target and still have remaining distance budget
            else {
                gameObject.setPosition(targetX, targetY);

                if (this.rotateToTarget) {
                    gameObject.rotation = AngleBetween(currentX, currentY, targetX, targetY);
                }

                remainingDistanceBudget -= distanceToTarget;

                // Continue to next target if any, otherwise complete
                if (this.targets.length > 0) {
                    var nextTargetAfterReach = this.targets.shift();
                    this.targetX = nextTargetAfterReach.x;
                    this.targetY = nextTargetAfterReach.y;
                    console.log('next target')
                    continue;
                }

                this.complete();
                if (this.shouldContinueAfterComplete()) {
                    console.log('continue')
                    continue;
                }
                return this;
            }

        }

        return this;
    },
}