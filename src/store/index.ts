import { createStore } from "vuex";

interface IAppState {
  auth: { id: number } | null;
  profile: { id: number; name?: string | null; email: string } | null;
}

export default createStore<IAppState>({
  state: {
    auth: null,
    profile: null,
  },
  getters: {
    authorized(state) {
      return Boolean(state.auth?.id);
    },
  },
  mutations: {
    setAuthData(state, payload) {
      state.auth = payload;
    },
    setUserProfile(state, payload) {
      state.profile = payload;
    },
  },
  actions: {
    async fetchUserProfile({ commit }) {
      await new Promise((r) => setTimeout(() => r(null), 3_000));
      commit("setUserProfile", {
        id: 1,
        name: "Dmitry",
        email: "ddpotapenko@gmail.ru",
      });
    },
    async signin({ commit }) {
      await new Promise((r) => setTimeout(() => r(null), 2_000));
      commit("setAuthData", {
        id: 1,
      });
    },
    logout({ commit }) {
      commit("setAuthData", null);
      commit("setUserProfile", null);
    },
  },
  modules: {},
});
