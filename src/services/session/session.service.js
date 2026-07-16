import { WalletRepository } from "@/repositories/wallet";
import {
    createSession,
    isValidSession
} from "./session.helper";

export class SessionService {

    constructor() {

        this.walletRepository = new WalletRepository();

    }

    async saveWallets(wallets) {

        const session = createSession(wallets);

        return await this.walletRepository.save(session);

    }

    async loadWallets() {

        const session = await this.walletRepository.getAll();

        if (!isValidSession(session)) {

            return [];

        }

        return session.wallets;

    }

    async clearWallets() {

        return await this.walletRepository.clear();

    }

}

export default SessionService;