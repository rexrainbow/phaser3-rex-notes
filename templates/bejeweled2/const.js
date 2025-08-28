export const FallingDirectionMap = {
    'left-to-right': 0,
    'top-to-bottom': 1,
    'right-to-left': 2,
    'bottom-to-top': 3,
}

export const FallingIndices = [
    // 0: 'left-to-right', scan from right to left
    {
        loopType: 'xy',
        startX: -2, endX: 0, // 0 <-- (width-2)
        startY: 1, endY: -2,
    },
    // 1: 'top-to-bottom', scan from bottom to top
    {
        loopType: 'yx',
        startX: 1, endX: -2,
        startY: -2, endY: 0, // 0 <-- (heigh-2)
    },
    // 2: 'right-to-left', scan from left to right
    {
        loopType: 'xy',
        startX: 1, endX: -1, // 1 --> (width-1)
        startY: 1, endY: -2,
    },
    // 3: 'bottom-to-top', scan from top to bottom
    {
        loopType: 'yx',
        startX: 1, endX: -2,
        startY: 1, endY: -1,  // 1 --> (height-1)
    },
]