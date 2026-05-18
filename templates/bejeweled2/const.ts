export const MovingDirectionMap = {
    'right': 0,
    'down': 1,
    'left': 2,
    'up': 3,
}

export const MovingIndices = [
    // 0 (right): 'left-to-right', scan from right to left
    {
        loopType: 'xy',
        startX: -2, endX: 0, // 0 <-- (width-2)
        startY: 1, endY: -2,
    },
    //  1 (down): 'top-to-bottom', scan from bottom to top
    {
        loopType: 'yx',
        startX: 1, endX: -2,
        startY: -2, endY: 0, // 0 <-- (heigh-2)
    },
    // 2 (left): 'right-to-left', scan from left to right
    {
        loopType: 'xy',
        startX: 1, endX: -1, // 1 --> (width-1)
        startY: 1, endY: -2,
    },
    // 3 (up): 'bottom-to-top', scan from top to bottom
    {
        loopType: 'yx',
        startX: 1, endX: -2,
        startY: 1, endY: -1,  // 1 --> (height-1)
    },
]