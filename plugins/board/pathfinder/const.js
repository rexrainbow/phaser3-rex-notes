export default {
    // a* search mode
    AREA_MODE: 16,
    PATH_MODE: 0,
    NEAREST_PATH_MODE: 1,

    // path mode
    'random': 0,
    'diagonal': 1,
    'straight': 2,
    'A*': 3,
    'line': 4,
    'A*-line': 5,
    'A*-random': 6,    

    // special cost
    'blocker': -1,

    // special moving point
    'infinity': -1,
};