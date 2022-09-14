import FadeIn from '../../fade-in.js';
import FadeOutDestroy from '../../fade-out-destroy.js';

var DefaultCoverTransitInCallback = function (cover, duration) {
    FadeIn(cover, duration, cover.alpha);
}

var DefaultCoverTransitOutCallback = function (cover, duration) {
    FadeOutDestroy(cover, duration, false);
}

export {
    DefaultCoverTransitInCallback,
    DefaultCoverTransitOutCallback
}