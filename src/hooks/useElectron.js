import ElectronService from "@/services/electron.service";

export function useElectron() {

    return {

        ping: ElectronService.ping

    };

}