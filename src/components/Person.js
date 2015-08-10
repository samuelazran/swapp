'use strict';

import React from 'react';
import './person.css';


class Person extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  maximize() {
    var toggleMinimized = !this.state.minimized;
    if (this.state.minimized && this.props.onMaximize) {
      this.props.onMaximize();
    }
    this.setState({minimized: toggleMinimized});
  }

  renderResidents(residentsData, ignorePersonName) {
    if (!residentsData) { return null; }
    return residentsData.map((person, personIndex) => {
      if (person.name !== ignorePersonName) {
        return (<li key={ person.url } personIndex={ personIndex }><a href={ '#' + person.name }>{ person.name }</a></li>);
      }
    });
  }

  render() {
    var body;
    if (!this.state.minimized) {
      body = (
        <ul>
          <li>height: { this.props.height }</li>
          <li>mass: { this.props.mass }</li>
          <li>hair color: { this.props.hair_color }</li>
          <li>skin color: { this.props.skin_color }</li>
          <li>eye color: { this.props.eye_color }</li>
          <li>birth year: { this.props.birth_year }</li>
          <li>gender: { this.props.gender }</li>
          <li>
            homeworld: { this.props.homeworldData.name || 'loading...' }
            <h5>{ this.props.homeworldData.name ? 'Other residents in ' + this.props.homeworldData.name : '' }</h5>
            <ol>
            { this.renderResidents(this.props.homeworldData.residentsData, this.props.name) }
            </ol>
          </li>
        </ul>
      );
    }
    return (
      <div className={ this.state.minimized ? 'person person-minimized' : 'person' }>
        <a name={ this.props.name }></a>
        <button className="person-name" onClick={this.maximize.bind(this)}>{ this.props.name }</button>
        { body }
      </div>
    );
  }

}


export default Person;
