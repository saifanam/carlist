/**
 *
 * Button.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React, { Children } from 'react';
import PropTypes from 'prop-types';

import A from './A';
import StyledButton from './StyledButton';

function Button(props) {
  // Render an anchor tag
  let button = (
    <A
      href={props.href}
      onClick={props.onClick}
      id={props.id}
      type={props.type}
      className={props.isActive}
    >
      {Children.toArray(props.children)}
    </A>
  );

  // If the Button has a handleRoute prop, we want to render a button
  if (props.handleRoute) {
    button = (
      <StyledButton onClick={props.handleRoute}>
        {Children.toArray(props.children)}
      </StyledButton>
    );
  }

  return <>{button}</>;
}

Button.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  handleRoute: PropTypes.func,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  isActive: PropTypes.string,
};

export default Button;
