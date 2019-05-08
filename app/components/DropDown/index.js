import React from 'react';
import PropTypes from 'prop-types';
import * as S from './style';

function DropDown(props) {
  const options = props.options.map((item, index) => (
    <option value={`${item}`} key={`option_${index}`}>
      {item}
    </option>
  ));
  return (
    <S.Select
      defaultValue={props.value}
      id={props.id}
      onChange={props.onChange}
    >
      {options}
    </S.Select>
  );
}

DropDown.propTypes = {
  id: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
};

export default DropDown;
