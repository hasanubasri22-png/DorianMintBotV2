class ElectronService {

    async ping() {

        if (!window.electron) {

            return {

                success: false,

                message: "Electron API unavailable"

            };

        }

        return await window.electron.invoke(

            "app:ping"

        );

    }

}

export default new ElectronService();