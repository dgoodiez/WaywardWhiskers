import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

/*
 * The authorization header is set for axios when you login but what happens when you come back or
 * the page is refreshed. When that happens you need to check for the token in local storage and if it
 * exists you should set the header so that it will be attached to each request
 */
const currentToken = localStorage.getItem('token')
const currentUser = JSON.parse(localStorage.getItem('user'));

if(currentToken != null) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
}

export default new Vuex.Store({
  state: {
    token: currentToken || '',
    user: currentUser || {},
    pets: [],
    activePet: {},
    matchedPets: [],
    rejectedPets: [],
  },
  mutations: {
    SET_AUTH_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user',JSON.stringify(user));
    },
    LOGOUT(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = '';
      state.user = {};
      axios.defaults.headers.common = {};
    },
    SET_ACTIVE_PET(state, petId) {
      state.activePet = petId;
    },
    SET_PETS(state, pets) {
      state.pets = pets;
    },
    ADD_PET(state, pet) {
      // const nextId = state.pets.reduce((max, item) => {
      //   return (item.id > max) ? max = item.id : max;
      // }, 0)
      // pet.id = nextId + 1;
      state.pets.push(pet)
    },
    UPDATE_PET(state, editedPet) {
      state.pets = this.state.pets.filter(pet => pet.id != editedPet.id);
      state.pets = state.pets.push(editedPet);
    },
    DELETE_PET(state, petId) {
      state.pets = this.state.pets.filter(pet => pet.id != petId);
    },
    UPDATE_CRITERIA(state, criteria) {
      state.criteria = criteria;
    },
    ADD_PET_TO_MATCHED(state, petId){
      state.matchedPets.push(petId);
      console.log(state.matchedPets);
    },
    ADD_PET_TO_REJECTED(state, petId){
      state.rejectedPets.push(petId);
      console.log(state.rejectedPets);
    }
  }
})
