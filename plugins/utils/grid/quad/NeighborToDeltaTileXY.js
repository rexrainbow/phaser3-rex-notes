// orthogonal or isometric
const OrthogonalMap = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 1],
    [-1, 1],
    [-1, -1],
    [1, -1]
];
const IsometricMap = OrthogonalMap;

// staggered
const StaggeredMap = [
    [
        [0, 1],
        [-1, 1],
        [-1, -1],
        [0, -1],
        [0, 2],
        [-1, 0],
        [0, -2],
        [1, 0]
    ],
    [
        [1, 1],
        [0, 1],
        [0, -1],
        [1, -1],
        [0, 2],
        [-1, 0],
        [0, -2],
        [1, 0]
    ]
];

export {
    OrthogonalMap,
    IsometricMap,
    StaggeredMap
};