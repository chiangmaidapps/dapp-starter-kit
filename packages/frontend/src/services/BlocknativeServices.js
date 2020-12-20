import Notify from "bnc-notify";
import Onboard from "bnc-onboard";

import {
  CHAIN_ID,
  BLOCKNATIVE_DAPP_ID,
} from "@/settings";

export function initOnboard(subscriptions) {
  return Onboard({
    dappId: BLOCKNATIVE_DAPP_ID,
    hideBranding: true,
    networkId: CHAIN_ID,
    darkMode: true,
    subscriptions,
    walletSelect: {
      wallets: [
        {walletName: "metamask", preferred: true}
      ],
    },
    walletCheck: [
      {checkName: "derivationPath"},
      {checkName: "connect"},
      {checkName: "accounts"},
      {checkName: "network"},
      {checkName: "balance", minimumBalance: "100000"},
    ],
  });
}

export function initNotify() {
  return Notify({
    dappId: BLOCKNATIVE_DAPP_ID,
    networkId: CHAIN_ID,
  });
}
