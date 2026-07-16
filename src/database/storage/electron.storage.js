export default class ElectronStorage {

    async get() {

        throw new Error(
            "ElectronStorage tidak boleh digunakan dari React Renderer. Gunakan IPC."
        );

    }

    async set() {

        throw new Error(
            "ElectronStorage tidak boleh digunakan dari React Renderer. Gunakan IPC."
        );

    }

    async remove() {

        throw new Error(
            "ElectronStorage tidak boleh digunakan dari React Renderer. Gunakan IPC."
        );

    }

}