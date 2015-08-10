'use strict';

import React from 'react';
import Person from './Person';


class People extends React.Component {

  render() {
    var peopleListElements;
    if (this.props.peopleList) {
      peopleListElements = this.props.peopleList.map((person, personIndex) => {
        return (
          <Person {... person } minimized={ true } onMaximize={ this.props.loadPlanets.bind(this, person) } key={ person.url } personIndex={ personIndex } />
        );
      });
    }
    return (
      <div className="people">
        { peopleListElements }
      </div>
    );
  }

}


export default People;
