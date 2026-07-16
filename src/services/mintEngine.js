export async function startMint({

    wallets,

    onWallet,

    onSuccess,

    onFailed,

    onFinish

}) {

    for (const wallet of wallets) {

        onWallet(wallet);

        await new Promise(resolve => setTimeout(resolve,800));

        const ok = Math.random() > 0.25;

        if(ok){

            onSuccess(wallet);

        }else{

            onFailed(wallet);

        }

    }

    onFinish();

}