import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {ethers} from 'ethers';

import SimpleTokenABI from '../contracts/SimpleToken';
import DeployedTokenAddresses from '../contracts/SimpleToken.address.json';

import {initOnboard, initNotify} from '@/services/BlocknativeServices';

let provider;
const onboard = initOnboard({
  wallet: (wallet) => {
    provider = new ethers.providers.Web3Provider(wallet.provider);
  },
});

const notify = initNotify();


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
    async setupContracts({commit, dispatch}) {
      const signer = provider.getSigner();
      const chain = await provider.getNetwork();

      const simpleTokenAddress = DeployedTokenAddresses[chain.chainId.toString()];
      const simpleTokenContract = new ethers.Contract(
        simpleTokenAddress,
        SimpleTokenABI,
        signer
      );

      commit('setContracts', {simpleTokenContract});
    },
  },
  getters: {
    contracts: (state) => state.contracts,
    account: (state) => state.account,
  },
});
