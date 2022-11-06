import { toRaw } from "vue";
import { createStore } from "vuex";

interface IAppState {
  auth: { id: number } | null;
  profile: { id: number; name?: string | null; email: string } | null;
}
const initialState: IAppState = {
  auth: null,
  profile: null,
};
const store = createStore<IAppState>({
  state: {
    ...initialState,
  },
  getters: {
    authorized(state) {
      return Boolean(state.auth?.id);
    },
  },
  mutations: {
    setAuthData(state, payload: IAppState["auth"]) {
      state.auth = payload;
    },
    setUserProfile(state, payload: IAppState["profile"]) {
      state.profile = payload;
    },
    setInitialState(state, payload?: Partial<IAppState>) {
      Object.assign(state, initialState);

      if (payload) {
        Object.assign(state, payload);
      }
    },
  },
  actions: {
    async fetchUserProfile({ commit }, userId: number) {
      try {
        const response = await fetch(`/profiles/${userId}`);
        const body = await response.json();
        if (response.status === 200) {
          commit("setUserProfile", body);
          return { success: true };
        } else if (response.status === 401) {
          return { success: false };
        }
      } catch (error) {
        return {
          success: false,
          reason: "Oops! We have unexpected problem, please try later",
        };
      }
    },
    async signin({ commit }, payload) {
      try {
        const response = await fetch("/login", {
          method: "post",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });
        const { id: userId, reason } = await response.json();

        if (response.status === 200) {
          commit("setAuthData", {
            id: userId,
          });
          return { success: true };
        } else if (response.status === 401) {
          return { success: false, reason };
        }
      } catch (error) {
        return {
          success: false,
          reason: "Oops! We have unexpected problem, please try later",
        };
      }
    },
    logout({ commit }) {
      commit("setAuthData", null);
      commit("setUserProfile", null);
    },
    initState({ commit }) {
      const persistState = localStorage.getItem("uprock_state");
      try {
        if (persistState) {
          commit("setInitialState", JSON.parse(persistState));
        }
      } catch (error) {
        /* TODO: handle it */
      }
    },
  },
  modules: {},
});

store.subscribe((p, state) => {
  try {
    if (p.type === "setInitialState") {
      return;
    }
    const persistState = {
      auth: toRaw(state.auth),
      profile: toRaw(state.profile),
    };
    localStorage.setItem("uprock_state", JSON.stringify(persistState));
  } catch {
    /* TODO: handle it */
  }
});

export default store;
