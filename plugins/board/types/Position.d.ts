/**
 * Tile position with x, y, and z.
 */
export type TileXYZType = {
    /**
     * Tile x.
     */
    x: number,
    /**
     * Tile y.
     */
    y: number,
    /**
     * Tile z or layer key.
     */
    z: number | string
};
/**
 * Tile position with optional z.
 */
export type TileXYType = {
    /**
     * Tile x.
     */
    x: number,
    /**
     * Tile y.
     */
    y: number,
    /**
     * Tile z or layer key.
     */
    z?: number | string
};
/**
 * Tile position with direction.
 */
export type TileXYDirectionType = {
    /**
     * Tile x.
     */
    x: number,
    /**
     * Tile y.
     */
    y: number,
    /**
     * Direction index.
     */
    direction: number
};

/**
 * World position.
 */
export type WorldXYType = {
    /**
     * World x.
     */
    x: number,
    /**
     * World y.
     */
    y: number
};
