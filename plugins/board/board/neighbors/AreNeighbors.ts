var AreNeighbors = function(chessA?: any, chessB?: any) {
    return (this.getNeighborChessDirection(chessA, chessB) !== null);
}
export default AreNeighbors;