'use strict';

import alt from '../alt';
import PlanetsActions from '../actions/PlanetsActions';
import PlanetsSource from '../sources/PlanetsSource';
console.log('PlanetsSource', PlanetsSource);

class PlanetsStore {

  constructor() {
    this.bindActions(PlanetsActions);
    this.registerAsync(PlanetsSource);
    this.url = '';
    this.planets = {};
    this.isLoading = false;
    this.person = null;
  }

  onLoadingPlanets(data) {
    console.log('PlanetsStore::onLoadingPlanets', data);
    this.isLoading = true;
  }

  onReceivedPlanets(response) {
    console.log('PlanetsStore::onReceivedPlanets', response);
    this.isLoading = false;
    this.planets[this.url] = response;
  }

  onFetchingPlanetsFailed(data) {
    console.log('PlanetsStore::onFetchingPlanetsFailed', data);
    this.isLoading = false;
  }

  onLoadPlanets(person) {
    console.log('PlanetsStore::onloadPlanets::person', person);
    window.setTimeout(function () { this.getPlanets(person); }.bind(this), 0);
  }

  getPlanets(person) {
    console.log('PlanetsStore::getPlanets', this.getInstance());
    if (!this.getInstance().isLoading()) {
      this.url = person.homeworld;
      this.person = person;
      this.getInstance().performGet(this.url);
    }
  }

}


export default alt.createStore(PlanetsStore);
