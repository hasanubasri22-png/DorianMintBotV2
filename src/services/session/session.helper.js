import { SESSION_VERSION } from "@/constants/session";

export function createSession(wallets = []) {

    return {

        version: SESSION_VERSION,

        createdAt: new Date().toISOString(),

        updatedAt: new Date().toISOString(),

        wallets

    };

}

export function isValidSession(session) {

    if (!session) return false;

    if (!Array.isArray(session.wallets)) return false;

    if (session.version !== SESSION_VERSION) return false;

    return true;

}