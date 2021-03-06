import {Apis} from "bitsharesjs-ws";
/** This file centralized customization and branding efforts throughout the whole wallet and is meant to facilitate
 *  the process.
 *
 *  @author Stefan Schiessl <stefan.schiessl@blockchainprojectsbv.com>
 */

/**
 * Determine if we are running on testnet or mainnet
 * @private
 */
function _isTestnet() {
    const chainId = (Apis.instance().chain_id || "4018d784").substr(0, 8);
    if (chainId === "4018d784") {
        return false;
    } else {
        // treat every other chain as testnet, exact would be chainId === "39f5e2ed"
        return true;
    }
}

/**
 * Wallet name that is used throughout the UI and also in translations
 * @returns {string}
 */
export function getWalletName() {
    return "Tatch Cloud Wallet";
}

/**
 * URL of this wallet
 * @returns {string}
 */
export function getWalletURL() {
    return "https://wallet.tatchcapital.com";
}

/**
 * Returns faucet information
 *
 * @returns {{url: string, show: boolean}}
 */
export function getFaucet() {
    return {
        url: "https://faucet.bitshares.eu/3a2df26c1bc74473", // 2017-12-infrastructure worker proposal
        show: true,
        editable: false
    };
}

/**
 * Logo that is used throughout the UI
 * @returns {*}
 */
export function getLogo() {
    return require("assets/logo-ico-blue.png");
}

/**
 * Default set theme for the UI
 * @returns {string}
 */
export function getDefaultTheme() {
    // possible ["darkTheme", "lightTheme", "midnightTheme"]
    return "midnightTheme";
}

/**
 * Default login method. Either "password" (for cloud login mode) or "wallet" (for local wallet mode)
 * @returns {string}
 */
export function getDefaultLogin() {
    // possible: one of "password", "wallet"
    return "password";
}

/**
 * Default units used by the UI
 *
 * @returns {[string,string,string,string,string,string]}
 */

export function getUnits(chainId = "4018d784") {
    if (chainId === "4018d784")
        return ["TATCH.EUR", "TATCH.USD", "TATCH.BTC", "TATCH.NLG"];
    else if (chainId === "39f5e2ed") return ["TEST"];
    // unknown chain id: (need to return at least one unit)
    else return ["BTS"];
}

/**
 * These are the highlighted bases in "My Markets" of the exchange
 *
 * @returns {[string]}
 */

export function getMyMarketsBases() {
    return [
        "TATCH.USD",
        "TATCH.EUR",
        "TATCH.NLG",
        "TATCH.BTC",
        "TCLGULDEN",
        "TATCHCOIN",
        "BTS", 
        "BEOS"
    ];
}

/**
 * These are the default quotes that are shown after selecting a base
 *
 * @returns {[string]}
 */
export function getMyMarketsQuotes() {
    let tokens = {
        nativeTokens: ["BTS"],
        tatchTokens: ["TATCHCOIN", "TCLGULDEN", "TCLSILVER"],
        tatchgateways: ["TATCH.EUR", "TATCH.USD", "TATCH.BTC", "TATCH.NLG"]
    };
    let allTokens = [];
    for (let type in tokens) {
        allTokens = allTokens.concat(tokens[type]);
    }
    return allTokens;
}

/**
 * The featured markets displayed on the landing page of the UI
 *
 * @returns {list of string tuples}
 */
export function getFeaturedMarkets(quotes = []) {
    return [

        ["BEOS", "TATCH.NLG"],
        ["TATCH.BTC", "TATCH.NLG"],
        ["TATCH.EUR", "TATCH.NLG"],
        ["TATCHCOIN", "TATCH.NLG"],
        ["TCLGULDEN", "TATCH.NLG"],
        ["TCLSILVER", "TATCH.NLG"],
        ["BRIDGE.WSP", "TATCH.NLG"],
        ["BRIDGE.PIVX", "TATCH.NLG"],
        ["TATCH.BTC", "TATCH.EUR"],
        ["BRIDGE.WSP", "TATCH.EUR"],
        ["BRIDGE.PIVX", "TATCH.EUR"],
        ["BTS", "TATCH.EUR"],
        ["BRIDGE.LTC", "TATCH.EUR"],
        ["TATCH.NLG", "TATCH.EUR"],
        ["TATCHCOIN", "TATCH.EUR"],
        ["TCLGULDEN", "TATCH.EUR"],
        ["TCLSILVER", "TATCH.EUR"],
        ["TATCH.BTC", "TATCH.BTC"],
        ["BRIDGE.WSP", "TATCH.BTC"],
        ["BRIDGE.PIVX", "TATCH.BTC"],
        ["BTS", "TATCH.BTC"],
        ["BITEUR", "TATCH.EUR"],
        ["BRIDGE.LTC", "TATCH.BTC"],
        ["TATCH.NLG", "TATCH.BTC"],
        ["TATCHCOIN", "TATCH.BTC"],
        ["TCLGULDEN", "TATCH.BTC"],
        ["TCLSILVER", "TATCH.BTC"]
    ].filter(a => {
        if (!quotes.length) return true;
        return quotes.indexOf(a[0]) !== -1;
    });
}

/**
 * Recognized namespaces of assets
 *
 * @returns {[string,string,string,string,string,string,string]}
 */
export function getAssetNamespaces() {
    return ["TATCH.", "BRIDGE.", "OPEN."];
}

/**
 * These namespaces will be hidden to the user, this may include "bit" for BitAssets
 * @returns {[string,string]}
 */
export function getAssetHideNamespaces() {
    // e..g "OPEN.", "bit"
    return ["TATCH."];
}

/**
 * Allowed gateways that the user will be able to choose from in Deposit Withdraw modal
 * @param gateway
 * @returns {boolean}
 */
export function allowedGateway(gateway) {
    return ["TATCH", "BRIDGE", "OPEN", "tatch"];
}

export function getSupportedLanguages() {
    // not yet supported
}

export function getAllowedLogins() {
    // possible: list containing any combination of ["password", "wallet"]
    return ["password", "wallet"];
}

export function getConfigurationAsset() {
    let assetSymbol = null;
    if (_isTestnet()) {
        assetSymbol = "NOTIFICATIONS";
    } else {
        assetSymbol = "TEST";
    }
    // explanation will be parsed out of the asset description (via split)
    return {
        symbol: assetSymbol,
        explanation:
            "This asset is used for decentralized configuration of the BitShares UI placed under bitshares.org."
    };
}
