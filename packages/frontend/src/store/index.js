import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {ethers} from 'ethers';

import SimpleTokenABI from '../contracts/SimpleToken';
import SimpleTokenAddresses from '../contracts/SimpleToken.address.json';

import {initOnboard} from '@/services/BlocknativeServices';

let provider;
const onboard = initOnboard({
  wallet: (wallet) => {
    provider = new ethers.providers.Web3Provider(wallet.provider);
  },
});

export default new Vuex.Store({
  state: {
    account: null,
    contracts: null,
  },
  mutations: {
    setAccount(state, account) {
      state.account = account;
    },
    setContracts(state, contracts) {
      state.contracts = contracts;
    },
  },
  actions: {
    async bootstrap({dispatch, commit}, {onSuccessCallback}) {

      await onboard.walletSelect();

      const readyToTransact = await onboard.walletCheck();

      if (readyToTransact) {
        const onboardState = onboard.getState();
        commit('setAccount', onboardState.address);
        await dispatch('setupContracts');

        if (onSuccessCallback) {
          onSuccessCallback();
        }
      }
    },
    async disconnect({commit}) {
      commit('setAccount', null);
    },
    async setupContracts({commit}) {
      const signer = provider.getSigner();
      const chain = await provider.getNetwork();

      const simpleTokenAddress = SimpleTokenAddresses[chain.chainId.toString()];
      const simpleTokenContract = new ethers.Contract(
        simpleTokenAddress,
        SimpleTokenABI,
        signer
      );

      commit('setContracts', {simpleTokenContract});
    },
    async transferTokens({state}, address, transferAmount) {
      if (state.contracts && state.account && address && transferAmount) {
        if (!ethers.utils.isAddress(address)) return;

        const {simpleTokenContract} = state.contracts;
        const tx = await simpleTokenContract.transfer(address, transferAmount);

        await tx.wait(1);
      }
    }
  },
  getters: {
    contracts: (state) => state.contracts,
    account: (state) => state.account,
  },
});
