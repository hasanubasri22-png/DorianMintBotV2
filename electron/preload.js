import {

    contextBridge,

    ipcRenderer

} from "electron";

contextBridge.exposeInMainWorld(

    "electron",

    {

        invoke(channel, data) {

            return ipcRenderer.invoke(

                channel,

                data

            );

        },

        send(channel, data) {

            ipcRenderer.send(

                channel,

                data

            );

        },

        on(channel, callback) {

            ipcRenderer.on(

                channel,

                (_, data) => callback(data)

            );

        }

    }

);