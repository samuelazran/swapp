'use strict';

import PlanetsActions from '../actions/PlanetsActions';
import axios from 'axios';


const PlanetsSource = {
  performGet: {
    // remotely fetch something (required)
    remote(state) {
      console.log('PlanetsSource::performGet::remote', state);
      return axios.get(`${state.url}`);
    },

    // this function checks in our local cache first
    // if the value is present it'll use that instead (optional).
    //  local(state) {
    //    console.log('PlanetsSource::performGet::local', state, state.planets[state.url]);
    //    return state.planets[state.url] ? state.planets[state.url] : null;
    //  },

      // here we setup some actions to handle our response
    loading: PlanetsActions.loadingPlanets, // (optional)
    success: PlanetsActions.receivedPlanets, // (required)
    error: PlanetsActions.fetchingPlanetsFailed // (required)

  }
};

export default PlanetsSource;
