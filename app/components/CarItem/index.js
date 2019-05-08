/*
 * CarItem
 */

import React from 'react';
import PropTypes from 'prop-types';
import Img from 'components/Img';
import H2 from 'components/H2';
import './style.scss';

export default class CarItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
    };
  }

  selectItem = () => {
    this.setState(prevState => ({
      isSelected: !prevState.isSelected,
    }));
  };

  render() {
    const {
      Photo,
      Name,
      Car_Type,
      Fuel_Type,
      Transmission,
      Seats,
      isAvailable,
      Price,
    } = this.props;
    const { isSelected } = this.state;
    return (
      <div className={`CarItem ${isSelected ? 'Selected' : ''}`}>
        <div className="CarPhoto">
          <Img src={Photo} alt="Car Photo" />
        </div>
        <div>
          <H2>{Name}</H2>
          <p>
            <strong>Car Type: </strong>
            {Car_Type}
          </p>
          <p>
            <strong>Fuel Type: </strong>
            {Fuel_Type}
          </p>
          <p>
            <strong>Transmission: </strong>
            {Transmission}
          </p>
          <p>
            <strong>Seats: </strong>
            {Seats}
          </p>
          <H2 className="CarPrice">{`₹ ${Price}`}</H2>
          <p className="Unavailable">{isAvailable ? '' : 'Not Available'}</p>
          <div
            onClick={this.selectItem}
            className={`ItemCTA ${isAvailable ? '' : 'Inactive'}`}
          >
            {isSelected ? 'Unselect' : 'Select'}
          </div>
        </div>
      </div>
    );
  }
}

CarItem.propTypes = {
  Photo: PropTypes.string,
  Name: PropTypes.string,
  Car_Type: PropTypes.string,
  Fuel_Type: PropTypes.string,
  Transmission: PropTypes.string,
  Seats: PropTypes.number,
  Price: PropTypes.number,
  isAvailable: PropTypes.bool,
};
