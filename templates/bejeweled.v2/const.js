export const FallingDirectionMap = {
    'left-to-right': 0,
    'top-to-bottom': 1,
    'right-to-left': 2,
    'bottom-to-top': 3,
}

export const Index0 = 1;
export const Index1 = -2;   /*width-2, or heigh-2 */
export const Prepare0 = 0;
export const Prepare1 = -1; /*width-1, or heigh-1 */

export const FallingIndices = [
    // 0: 'left-to-right', scan from right to left
    {
        loopType: 'xy',
        startX: Index1, endX: Prepare0, // Prepare0 <-- Index1
        startY: Index0, endY: Index1,
    },
    // 1: 'top-to-bottom', scan from bottom to top
    {
        loopType: 'yx',
        startX: Index0, endX: Index1,
        startY: Index1, endY: Prepare0, // Prepare0 <-- Index1
    },
    // 2: 'right-to-left', scan from left to right
    {
        loopType: 'xy',
        startX: Index0, endX: Prepare1, // Index0 --> Prepare1
        startY: Index0, endY: Index1,
    },
    // 3: 'bottom-to-top', scan from top to bottom
    {
        loopType: 'yx',
        startX: Index0, endX: Index1,
        startY: Index0, endY: Prepare1,  // Index0 --> Prepare1
    },
]