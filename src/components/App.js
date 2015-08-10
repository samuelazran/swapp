'use strict';

import React from 'react';

import PeopleStore from '../stores/PeopleStore';
import PeopleActions from '../actions/PeopleActions';
import PlanetsActions from '../actions/PlanetsActions';
import People from './People';
import './app.css';

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the store and passes the new data to its children.
 */

class App extends React.Component {

  constructor(props) {
    super(props);
    PeopleStore.listen(this.onChange.bind(this));
    this.state = PeopleStore.getState();
  }

  /**
  * Triggered in every change in the store
  */
  onChange() {
    this.setState(PeopleStore.getState());
  }

  startLoadPeople() {
    PeopleActions.nextPage();
  }

  loadPlanets(person) {
    PlanetsActions.loadPlanets(person);
  }

  componentDidMount() {
    this.startLoadPeople();
  }

  filter(event) {
    var term = event.target.value.trim().toLowerCase();
    PeopleActions.searchPeople({term: term});
  }

  sortAlphabetically() {
    var params = {order: 'alphabetically'};
    PeopleActions.sortPeople(params);
  }

  render() {
    return (
      <div className="app">
        <div className="app-status">{ this.state.isLoading ? 'Loading page ' + this.state.page + '...' : (this.state.isSearchResults ? 'found ' + this.state.peopleList.length + ' results' : 'done loading ' + this.state.fetchedCount + ' people') }</div>
        <input type="text" onKeyUp={ this.filter.bind(this) } className="search-people" placeholder="Filter..." />
        <button onClick={ this.sortAlphabetically } className="sort-people">Sort</button>
        <People peopleList={ this.state.peopleList } loadPlanets={ this.loadPlanets } />
      </div>
	);
  }
}


export default App;
