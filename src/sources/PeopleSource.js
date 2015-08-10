'use strict';

import PeopleActions from '../actions/PeopleActions';
import axios from 'axios';


const PeopleSource = {
  performGet: {
    // remotely fetch something (required)
    remote(state) {
      console.log('PeopleSource::performGet::remote', state);
      return axios.get(`http://swapi.co/api/people/?page=${state.page}`);
    },

    // this function checks in our local cache first
    // if the value is present it'll use that instead (optional).
    local(state) {
      console.log('PeopleSource::performGet::local', state);
      return state.pages[state.page] ? state.pages[state.page] : null;
    },

      // here we setup some actions to handle our response
    loading: PeopleActions.loadingPeople, // (optional)
    success: PeopleActions.receivedPeople, // (required)
    error: PeopleActions.fetchingPeopleFailed, // (required)

    // should fetch has precedence over the value returned by local in determining whether remote should be called
    // in this particular example if the value is present locally it would return but still fire off the remote request (optional)
    shouldFetch(state) {
      console.log('PeopleSource::performGet::shouldFetch', state);
      return true;
    }
  }
};

export default PeopleSource;
