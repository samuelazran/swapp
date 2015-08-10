'use strict';

import alt from '../alt';


class PlanetsActions {
  constructor() {
    this.generateActions(
      'loadingPlanets',
      'receivedPlanets',
      'fetchingPlanetsFailed',
      'getPlanets',
      'loadPlanets'
    );
  }
}


export default alt.createActions(PlanetsActions);
