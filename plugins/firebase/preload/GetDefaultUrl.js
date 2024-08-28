const VERSION = '10.13';

var GetDefaultUrl = function (version) {
    if (version === undefined) {
        version = VERSION
    }
    return {
        app: `https://www.gstatic.com/firebasejs/${version}/firebase-app-compat.js`,

        // auth: `https://www.gstatic.com/firebasejs/${version}/firebase-auth-compat.js`,
        database: `https://www.gstatic.com/firebasejs/${version}/firebase-database-compat.js`,
        firestore: `https://www.gstatic.com/firebasejs/${version}/firebase-firestore-compat.js`,
        // storage: `https://www.gstatic.com/firebasejs/${version}/firebase-storage-compat.js`,

        // analytics: `https://www.gstatic.com/firebasejs/${version}/firebase-analytics-compat.js`,
        // functions: `https://www.gstatic.com/firebasejs${version}/firebase-functions-compat.js`,
        // messaging: `https://www.gstatic.com/firebasejs/${version}/firebase-messaging-compat.js`,
        // performance: `https://www.gstatic.com/firebasejs/${version}/firebase-performance-compat.js`,
        // 'remote-config': `https://www.gstatic.com/firebasejs/${version}/firebase-remote-config-compat.js`
    }
}

export default GetDefaultUrl;
