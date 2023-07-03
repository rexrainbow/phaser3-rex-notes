const FadeMode = {
    tint: 0,
    alpha: 1
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
        return ((this.fadeMode === undefined) || (this.fadeMode === 0)) &&
            (this.fadeTime > 0) && (gameObject.setTint !== undefined);
    },

    useAlphaFadeEffect(gameObject) {
        return ((this.fadeMode === undefined) || (this.fadeMode === 1)) &&
            (this.fadeTime > 0) && (gameObject.setAlpha !== undefined);
    },

    fadeBob(bob, fromValue, toValue, onComplete) {
        var gameObject = bob.gameObject;
        if (this.useTintFadeEffect(gameObject)) {
            if (fromValue !== undefined) {
                bob.setProperty('tintGray', 255 * fromValue)
            }
            bob.easeProperty(
                'tintGray',                 // property
                Math.floor(255 * toValue), // to value
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
        } else {
            if (onComplete) {
                onComplete(gameObject);
            }
        }

        return this;
    }

}