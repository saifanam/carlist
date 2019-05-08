/*
 * CarList
 */
import React from 'react';
import PropTypes from 'prop-types';
import CarItem from 'components/CarItem';
import Button from 'components/Button';
import Img from 'components/Img';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Ham from '../../images/ham.png';
import Close from '../../images/close.png';
import {
  makeSelectUserLocation,
  makeSelectUserStartDate,
} from '../HomePage/selectors';
import { CAR_LIST } from './config';
import './style.scss';

class CarList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carList: null,
      userStartDay: '',
      filterBy: {},
      isFilterActive: false,
    };
  }

  componentWillMount = () => {
    let { userStartDate } = this.props;
    let userStartDay;
    userStartDate = new Date(userStartDate);
    userStartDay = userStartDate.getDay();
    userStartDay = this.getDayName(userStartDay);
    this.setState({ userStartDay });
    this.resetList();
  };

  componentDidMount = () => {
    this.paintList();
    this.setState({
      Automatic: false,
      Manual: false,
      Petrol: false,
      Diesel: false,
      Hatchback: false,
      SUV: false,
      MiniSUV: false,
      Sedan: false,
    });
  };

  getDayName = day => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days.filter((item, index) => index === day)[0];
  };

  resetList = (callback = () => {}) => {
    const carList = CAR_LIST.filter(
      item => item.Location === this.props.userLocation,
    );
    this.setState({ carList }, callback);
  };

  paintList = (list = this.state.carList) => {
    const { userStartDay } = this.state;
    return list.map((item, index) => (
      <CarItem
        key={`car_${index}`}
        Photo={item.Photo}
        Name={item.Name}
        Car_Type={item.Car_Type}
        Fuel_Type={item.Fuel_Type}
        Transmission={item.Transmission}
        Seats={item.Seats}
        Price={item.Price}
        isAvailable={item.Availability.indexOf(userStartDay) !== -1}
        selectItem={this.selectItem}
      />
    ));
  };

  sortByPrice = e => {
    e.preventDefault();
    const {
      target: { id },
    } = e;
    const { filteredList } = this.state;
    this.setState({ sortActiveState: id });
    if (id === 'LH') {
      if (filteredList) {
        this.setState(
          prevState => ({
            filteredList: [...prevState.filteredList].sort(
              (a, b) => a.Price - b.Price,
            ),
          }),
          this.paintList,
        );
      } else {
        this.setState(
          prevState => ({
            carList: [...prevState.carList].sort((a, b) => a.Price - b.Price),
          }),
          this.paintList,
        );
      }
    } else if (id === 'HL') {
      if (filteredList) {
        this.setState(
          prevState => ({
            filteredList: [...prevState.filteredList].sort(
              (a, b) => b.Price - a.Price,
            ),
          }),
          this.paintList,
        );
      } else {
        this.setState(
          prevState => ({
            carList: [...prevState.carList].sort((a, b) => b.Price - a.Price),
          }),
          this.paintList,
        );
      }
    }
  };

  handleFilterSelect = e => {
    this.setState({ sortActiveState: null });
    const {
      target: { id, type },
    } = e;
    this.setState(
      prevState => ({
        [id]: !prevState[id],
      }),
      this.updateFilterList(id, !this.state[id], type),
    );
  };

  updateFilterList = (id, value, type) => {
    const { filterBy } = this.state;
    if (value) {
      if (filterBy[type]) {
        filterBy[type].push(id);
      } else {
        filterBy[type] = [id];
      }
    } else {
      const index = filterBy[type].indexOf(id);
      filterBy[type].splice(index, 1);
      if (filterBy[type].length === 0) {
        delete filterBy[type];
      }
    }
    this.setState({ filterBy }, this.getFilteredList);
  };

  getFilteredList = () => {
    const { filterBy, carList } = this.state;
    const filteredList = carList.filter(o =>
      Object.keys(filterBy).every(k => filterBy[k].some(f => o[k] === f)),
    );
    this.setState({ filteredList });
    this.paintList(filteredList);
  };

  showFilter = () => {
    this.setState({ isFilterActive: true });
  };

  hideFilter = () => {
    this.setState({ isFilterActive: false });
  };

  render() {
    const {
      carList,
      filteredList,
      sortActiveState,
      isFilterActive,
    } = this.state;
    const items = filteredList ? filteredList.length : carList.length;
    return (
      <div className="ContentWrap">
        <Img
          className="Hamburger"
          src={Ham}
          alt="Ham"
          onClick={this.showFilter}
        />
        <div className={`FilterWrap ${isFilterActive ? 'Active' : ''}`}>
          <Img
            className="CloseTrigger"
            src={Close}
            alt="Close"
            onClick={this.hideFilter}
          />
          <p className="Subhead">
            <strong>Sort By:</strong>
          </p>
          <Button
            isActive={sortActiveState === 'LH' ? 'active' : ''}
            onClick={this.sortByPrice}
            id="LH"
          >
            Price (Low to High)
          </Button>
          <Button
            isActive={sortActiveState === 'HL' ? 'active' : ''}
            onClick={this.sortByPrice}
            id="HL"
          >
            Price (High to Low)
          </Button>
          <div>
            <p className="Subhead">
              <strong>Filter By:</strong>
            </p>
            <div>
              <div>Transmission</div>
              <div className="FilterRow">
                <Button
                  onClick={this.handleFilterSelect}
                  id="Automatic"
                  type="Transmission"
                  isActive={this.state.Automatic ? 'active' : ''}
                >
                  Automatic
                </Button>
                <Button
                  onClick={this.handleFilterSelect}
                  id="Manual"
                  type="Transmission"
                  isActive={this.state.Manual ? 'active' : ''}
                >
                  Manual
                </Button>
              </div>
            </div>
            <div>
              <div>Car Type</div>
              <div className="FilterRow">
                <Button
                  onClick={this.handleFilterSelect}
                  id="Hatchback"
                  type="Car_Type"
                  isActive={this.state.Hatchback ? 'active' : ''}
                >
                  Hatchback
                </Button>
                <Button
                  onClick={this.handleFilterSelect}
                  id="Sedan"
                  type="Car_Type"
                  isActive={this.state.Sedan ? 'active' : ''}
                >
                  Sedan
                </Button>
              </div>
              <div className="FilterRow">
                <Button
                  onClick={this.handleFilterSelect}
                  id="MiniSUV"
                  type="Car_Type"
                  isActive={this.state.MiniSUV ? 'active' : ''}
                >
                  Mini SUV
                </Button>
                <Button
                  onClick={this.handleFilterSelect}
                  id="SUV"
                  type="Car_Type"
                  isActive={this.state.SUV ? 'active' : ''}
                >
                  SUV
                </Button>
              </div>
            </div>
            <div>
              <div>Fuel type</div>
              <div className="FilterRow">
                <Button
                  onClick={this.handleFilterSelect}
                  id="Petrol"
                  type="Fuel_Type"
                  isActive={this.state.Petrol ? 'active' : ''}
                >
                  Petrol
                </Button>
                <Button
                  onClick={this.handleFilterSelect}
                  id="Diesel"
                  type="Fuel_Type"
                  isActive={this.state.Diesel ? 'active' : ''}
                >
                  Diesel
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="ListWrap">
          {`${items} car${items > 1 ? 's' : ''} found in ${
            this.props.userLocation
          }`}
          {filteredList
            ? this.paintList(filteredList)
            : this.paintList(carList)}
        </div>
      </div>
    );
  }
}

CarList.propTypes = {
  userLocation: PropTypes.string,
  userStartDate: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userLocation: makeSelectUserLocation(),
  userStartDate: makeSelectUserStartDate(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarList);
