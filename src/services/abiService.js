export async function loadAbi(file) {

    const text = await file.text();

    return JSON.parse(text);

}

export function getWriteFunctions(abi) {

    return abi.filter(item =>

        item.type === "function" &&
        item.stateMutability !== "view" &&
        item.stateMutability !== "pure"

    );

}

export function getPayableFunctions(abi) {

    return abi.filter(item =>

        item.type === "function" &&
        item.stateMutability === "payable"

    );

}

export function getFunctionInputs(abi, functionName) {

    const fn = abi.find(item =>

        item.type === "function" &&
        item.name === functionName

    );

    if (!fn) return [];

    return fn.inputs || [];

}