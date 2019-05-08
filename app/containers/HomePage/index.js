/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import DropDown from 'components/DropDown';
import Button from 'components/Button';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CAR_LIST } from '../CarList/config';
import * as appActions from '../App/actions';
import { makeSelectUserLocation, makeSelectUserStartDate } from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      locationList: null,
      selectedLocation: props.userLocation,
      selectedDate: null,
    };
  }

  componentWillMount = () => {
    let locationList = [];
    CAR_LIST.forEach(item => {
      locationList.push(item.Location);
    });
    locationList = locationList.filter(
      (item, pos) => locationList.indexOf(item) === pos,
    );
    this.setState({
      locationList,
      selectedDate: new Date(),
    });
  };

  componentDidMount = () => {
    const { locationList, selectedLocation } = this.state;
    if (!selectedLocation) {
      this.setState({ selectedLocation: locationList[0] });
    }
  };

  componentWillReceiveProps = newProps => {
    if (
      this.state.selectedDate &&
      newProps.userStartDate &&
      this.state.selectedDate !== newProps.userStartDate
    ) {
      this.setState({ selectedDate: newProps.userStartDate });
    }
  };

  gotoCarList = () => {
    const { selectedLocation, selectedDate } = this.state;
    if (selectedLocation && selectedDate) {
      this.props.dispatch(appActions.setUserLocation(selectedLocation));
      this.props.dispatch(appActions.setUserStartDate(selectedDate));
      this.props.history.push('/carlist');
    }
  };

  handleLocation = e => {
    this.setState({ selectedLocation: e.target.value });
  };

  handleStartDate = value => {
    this.setState({
      selectedDate: value,
    });
  };

  render() {
    return (
      <article>
        <Helmet>
          <title>Find your car</title>
          <meta name="description" content="Self drive car search" />
        </Helmet>
        <div className="HomeWrap">
          <h1>Simply share your location, date and hit Submit!</h1>
          <DropDown
            value={this.state.selectedLocation}
            options={this.state.locationList}
            onChange={this.handleLocation}
          />
          <div className="DatePicker">
            <DatePicker
              selected={this.state.selectedDate}
              onChange={this.handleStartDate}
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
            />
          </div>
          <Button onClick={this.gotoCarList}>Submit</Button>
        </div>
      </article>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

HomePage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  userLocation: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  userLocation: makeSelectUserLocation(),
  userStartDate: makeSelectUserStartDate(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
