'use strict';

import alt from '../alt';
import PeopleActions from '../actions/PeopleActions';
import PeopleSource from '../sources/PeopleSource';
import PlanetsActions from '../actions/PlanetsActions';
import PlanetsStore from '../stores/PlanetsStore';


alt.dispatcher.register(function (d) {
  console.log('*dispatcher*', d);
});

class PeopleStore {

  constructor() {
    this.bindActions(PeopleActions);
    this.bindAction(PlanetsActions.receivedPlanets, this.onReceivedPlanets);
    this.bindAction(PlanetsActions.loadPlanets, this.onLoadPlanets);
    this.registerAsync(PeopleSource);
    this.count = null;
    this.fetchedCount = 0;
    this.pageSize = 10;
    this.pagesAmount = null;
    this.isLastPage = null;
    this.page = 0;
    this.pages = {};
    this.people = {};
    this.peopleList = [];
    this.peopleNames = {};
    this.peopleNamesList = [];
    this.isLoading = false;
    this.planet = null;
    this.isSearchResults = false;
  }

  onLoadingPeople(data) {
    console.log('PeopleStore::onLoadingPeople', data);
    this.isLoading = true;
  }

  onReceivedPeople(response) {
    console.log('PeopleStore::onReceivedPeople', response);
    this.isLoading = false;
    this.pages[this.page] = response.data.results;
    for (var personIndex in this.pages[this.page]) {
      var person = this.pages[this.page][personIndex];
      this.people[person.url] = person;
      person.homeworldData = {};
      this.peopleList.push(person);
      this.peopleNamesList.push(person.name);
      this.peopleNames[person.name] = this.peopleNamesList.length - 1;
    }
    this.count = response.data.count;
    this.fetchedCount += this.pages[this.page].length;
    this.pagesAmount = Math.ceil(this.count / this.pageSize);
    if (this.count > this.fetchedCount) {
      this.nextPage();
    }
  }

  onFetchingPeopleFailed(data) {
    console.log('PeopleStore::onFetchingPeopleFailed', data);
    this.isLoading = false;
  }

  onLoadPlanets(person) {
    this.waitFor(PlanetsStore.dispatchToken);
    console.log('PeopleStore::onloadPlanets::person', person);
    this.person = person;
  }

  onReceivedPlanets(response) {
    this.waitFor(PlanetsStore.dispatchToken);
    console.log('PeopleStore::onReceivedPlanets', response, this.person);
    this.person.homeworldData = response.data;
    this.person.homeworldData.residentsData = [];
    for (var resident in this.person.homeworldData.residents) {
      var residentUrl = this.person.homeworldData.residents[resident];
      this.person.homeworldData.residentsData.push(this.people[residentUrl]);
    }
  }

  nextPage(data) {
    console.log('PeopleStore::onNextPage', data);
    if (!this.isLastPage) {
      this.page++;
      window.setTimeout(function () { this.getPeople(); }.bind(this), 0);
    }
  }

  getPeople() {
    if (this.page === this.pagesAmount) {
      this.isLastPage = true;
    }
    if (!this.getInstance().isLoading()) {
      this.getInstance().performGet();
    }
  }

  onSearchPeople(payload) {
    var term = payload.term;
    this.peopleList = [];
    for (var pageIndex in this.pages) {
      for (var personIndex in this.pages[pageIndex]) {
        var person = this.pages[pageIndex][personIndex];
        if (term.length === 0 || person.name.toLowerCase() === term || person.name.toLowerCase().startsWith(term)) {
          this.peopleList.push(person);
        }
      }
    }
    this.isSearchResults = (term.length !== 0);
  }

  onSortPeople(payload) {
    var order = payload.order;
    if (order === 'alphabetically') {
      this.peopleList.sort(sortAlphabetically);
    }
  }

}

function sortAlphabetically(a, b) {
  return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
}

export default alt.createStore(PeopleStore);
