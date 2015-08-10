'use strict';

import alt from '../alt';


class PeopleActions {
  constructor() {
    this.generateActions(
      'loadingPeople',
      'receivedPeople',
      'fetchingPeopleFailed',
      'getPeople',
      'nextPage',
      'searchPeople',
      'sortPeople'
    );
  }
}


export default alt.createActions(PeopleActions);
