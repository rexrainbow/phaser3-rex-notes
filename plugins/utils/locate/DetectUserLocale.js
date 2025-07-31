var DetectUserLocale = function (fallback) {
    if (fallback === undefined) {
        fallback = 'en';
    }
    if (navigator.languages && navigator.languages.length) {
        return navigator.languages[0];
    }
    return navigator.language || fallback;
}

export default DetectUserLocale;