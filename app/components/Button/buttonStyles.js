import { css } from 'styled-components';

const buttonStyles = css`
  display: inline-block;
  box-sizing: border-box;
  padding: 0.25em 2em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid #9448ff;
  color: #9448ff;
  margin: 0.3em 1em 1em 0;

  &.active {
    background: #9448ff;
    color: #fff;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    text-align: center;
  }
`;

export default buttonStyles;
