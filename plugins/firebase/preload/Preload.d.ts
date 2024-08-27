export default Preload;

declare namespace Preload {
    interface IUrlConfig {
        app?: string,
        database?: string,
        firestore?: string,
    }

    interface IFirebaseConfig {
        apiKey?: string,
        authDomain?: string,
        databaseURL?: string,
        projectId?: string,
        storageBucket?: string,
        messagingSenderId?: string,
    }
}

declare function Preload(
    urlConfig?: Preload.IUrlConfig | string,
    firebaseConfig?: Preload.IFirebaseConfig,
): Promise<any>;