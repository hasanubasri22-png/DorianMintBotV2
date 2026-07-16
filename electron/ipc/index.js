import { ipcMain } from "electron";

export function registerIPC() {

    ipcMain.handle(

        "app:ping",

        async () => {

            return {

                success: true,

                message: "pong"

            };

        }

    );

}