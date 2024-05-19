import AddEffectProperties from '../../../../behaviors/effectproperties/AddEffectProperties.js';

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
            (this.fadeTime > 0) && (gameObject.preFX || gameObject.postFX);
    },

    fadeBob(bob, fromValue, toValue, onComplete) {
        var gameObject = bob.gameObject;
        if (this.useTintFadeEffect(gameObject)) {
            if (fromValue !== undefined) {
                bob.setProperty('tintGray', 255 * fromValue)
            }
            bob.easeProperty({
                property: 'tintGray',
                value: Math.floor(255 * toValue),
                duration: this.fadeTime,
                delay: 0,
                ease: 'Linear',
                repeat: 0,
                yoyo: false,
                from: false,
                complete: onComplete
            });

        } else if (this.useAlphaFadeEffect(gameObject)) {
            if (fromValue !== undefined) {
                bob.setProperty('alpha', fromValue);
            }
            bob.easeProperty({
                property: 'alpha',
                value: toValue,
                duration: this.fadeTime,
                delay: 0,
                ease: 'Linear',
                repeat: 0,
                yoyo: false,
                from: false,
                complete: onComplete
            });

        } else if (this.useRevealEffect(gameObject)) {
            AddEffectProperties(gameObject, 'reveal');
            var propertyName;
            switch (this.fadeMode) {
                case FadeRevealUp: propertyName = 'revealUp'; break;
                case FadeRevealDown: propertyName = 'revealDown'; break;
                case FadeRevealLeft: propertyName = 'revealLeft'; break;
                case FadeRevealRight: propertyName = 'revealRight'; break;
            }

            if (fromValue === undefined) {
                fromValue = 0;
            }
            gameObject[propertyName] = fromValue;
            bob.easeProperty({
                property: propertyName,
                value: toValue,
                duration: this.fadeTime,
                delay: 0,
                ease: 'Linear',
                repeat: 0,
                yoyo: false,
                from: false,
                complete: onComplete
            });

            bob.getTweenTask(propertyName).once('complete', function () {
                gameObject[propertyName] = null;
            })

        } else {
            if (onComplete) {
                onComplete(gameObject);
            }

        }

        return this;
    }

}