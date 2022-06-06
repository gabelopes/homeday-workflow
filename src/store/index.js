import { createStore } from "vuex";
import GitHubService from "@/services/GitHubService.js";

export default createStore({
  state: {
    firstName: "",
    lastName: "",
    gitHubUser: "",
    gitHubPicture: "",
    email: "",
    consent: false,
    userExists: null
  },
  getters: {
    firstName({ firstName }) {
      return firstName;
    },
    lastName({ lastName }) {
      return lastName;
    },
    gitHubUser({ gitHubUser }) {
      return gitHubUser;
    },
    gitHubPicture({ gitHubPicture }) {
      return gitHubPicture;
    },
    email({ email }) {
      return email;
    },
    consent({ consent }) {
      return consent;
    },
    userExists({ userExists }) {
      return userExists;
    }
  },
  mutations: {
    mutateFirstName(state, firstName) {
      state.firstName = firstName;
    },
    mutateLastName(state, lastName) {
      state.lastName = lastName;
    },
    mutateGitHubUser(state, gitHubUser) {
      state.gitHubUser = gitHubUser;
    },
    mutateGitHubPicture(state, gitHubPicture) {
      state.gitHubPicture = gitHubPicture;
    },
    mutateEmail(state, email) {
      state.email = email;
    },
    mutateConsent(state, consent) {
      state.consent = consent;
    },
    mutateUserExists(state, userExists) {
      state.userExists = userExists;
    }
  },
  actions: {
    async fetchGitHubPicture({ commit, getters }) {
      try {
        const user = await GitHubService.retrieveUser(getters.gitHubUser);

        commit("mutateGitHubPicture", user.avatar_url);
        commit("mutateUserExists", true);
      } catch {
        commit("mutateUserExists", false);
      }
    },

    setFirstName({ commit }, firstName) {
      commit("mutateFirstName", firstName);
    },
    setLastName({ commit }, lastName) {
      commit("mutateLastName", lastName);
    },
    setGitHubUser({ commit }, gitHubUser) {
      commit("mutateGitHubUser", gitHubUser);
    },
    setEmail({ commit }, email) {
      commit("mutateEmail", email);
    },
    setConsent({ commit }, consent) {
      commit("mutateConsent", consent);
    }
  },
  modules: {}
});
