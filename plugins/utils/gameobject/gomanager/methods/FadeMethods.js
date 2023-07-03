const FadeTint = 0;
const FadeAlpha = 1;
const FadeRevealUp = 2;
const FadeRevealDown = 3;
const FadeRevealLeft = 4;
const FadeRevealRight = 5;

const FadeMode = {
    tint: FadeTint,
    alpha: FadeAlpha,
    revealUp: FadeRevealUp,
    revealDown: FadeRevealDown,
    revealLeft: FadeRevealLeft,
    revealRight: FadeRevealRight,
}

export default {
    setGOFadeMode(fadeMode) {
        if (typeof (fadeMode) === 'string') {
            fadeMode = FadeMode[fadeMode];
        }

        this.fadeMode = fadeMode;
        return this;
    },

    setGOFadeTime(time) {
        this.fadeTime = time;
        return this;
    },

    useTintFadeEffect(gameObject) {
        return ((this.fadeMode === undefined) || (this.fadeMode === FadeTint)) &&
            (this.fadeTime > 0) && (gameObject.setTint !== undefined);
    },

    useAlphaFadeEffect(gameObject) {
        return ((this.fadeMode === undefined) || (this.fadeMode === FadeAlpha)) &&
            (this.fadeTime > 0) && (gameObject.setAlpha !== undefined);
    },

    useRevealEffect(gameObject) {
        return ((this.fadeMode >= FadeRevealUp) && (this.fadeMode <= FadeRevealRight)) &&
            (this.fadeTime > 0) && (gameObject.preFX !== undefined);
    },

    fadeBob(bob, fromValue, toValue, onComplete) {
        var gameObject = bob.gameObject;
        if (this.useTintFadeEffect(gameObject)) {
            if (fromValue !== undefined) {
                bob.setProperty('tintGray', 255 * fromValue)
            }
            bob.easeProperty(
                'tintGray',                 // property
                Math.floor(255 * toValue),  // to value
                this.fadeTime,              // duration
                'Linear',                   // ease
                0,                          // repeat
                false,                      // yoyo
                onComplete                  // onComplete
            )

        } else if (this.useAlphaFadeEffect(gameObject)) {
            if (fromValue !== undefined) {
                bob.setProperty('alpha', fromValue);
            }
            bob.easeProperty(
                'alpha',                    // property
                toValue,                    // to value
                this.fadeTime,              // duration
                'Linear',                   // ease
                0,                          // repeat
                false,                      // yoyo
                onComplete                  // onComplete
            )

        } else if (this.useRevealEffect(gameObject)) {
            bob.removeEffect('reveal');
            var dir = ((this.fadeMode === FadeRevealUp) || (this.fadeMode === FadeRevealLeft)) ? 1 : 0;
            var axis = ((this.fadeMode === FadeRevealUp) || (this.fadeMode === FadeRevealDown)) ? 1 : 0;
            bob.setEffect('fade_reveal', 'reveal', 0.1, dir, axis);

            var effect = bob.getEffect('fade_reveal');
            if (fromValue !== undefined) {
                effect.progress = fromValue;
            }
            bob.easeProperty(
                'progress',                 // property
                toValue,                    // to value
                this.fadeTime,              // duration
                'Linear',                   // ease
                0,                          // repeat
                false,                      // yoyo
                onComplete,                 // onComplete
                effect                      // target
            )

        } else {
            if (onComplete) {
                onComplete(gameObject);
            }

        }

        return this;
    }

}