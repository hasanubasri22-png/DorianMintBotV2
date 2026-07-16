export class WalletRepository {

    async getAll() {

        return await window.electron.invoke(
            "wallet:getAll"
        );

    }

    async save(session) {

        return await window.electron.invoke(
            "wallet:save",
            session
        );

    }

    async clear() {

        return await window.electron.invoke(
            "wallet:clear"
        );

    }

}

export default new WalletRepository();