import Bank from '../../bank';

var ChessBank = new Bank({
    uidKey: '$uid',
    remove: false, // remove uid manually
});
export default ChessBank;