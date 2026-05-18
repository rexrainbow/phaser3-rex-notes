import FadeIn from '../../fade-in';
import FadeOutDestroy from '../../fade-out-destroy';

var DefaultCoverTransitInCallback = function(cover?: any, duration?: any) {
    if (cover._modalAlphaSave !== undefined) {
        cover.alpha = cover._modalAlphaSave;
    } else {
        cover._modalAlphaSave = cover.alpha;
    }

    FadeIn(cover, duration, cover.alpha);
}

var DefaultCoverTransitOutCallback = function(cover?: any, duration?: any) {
    FadeOutDestroy(cover, duration, false);
}

export {
    DefaultCoverTransitInCallback,
    DefaultCoverTransitOutCallback
}