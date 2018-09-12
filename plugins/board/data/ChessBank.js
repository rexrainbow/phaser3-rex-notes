import Bank from 'rexPlugins/bank.js';

var ChessBank = new Bank({
    uidKey: '$uid',
    remove: false, // remove uid manually
});
export default ChessBank;