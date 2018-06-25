import React, { Component } from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import { makeDateRange } from "../fields/makeDateRange";

const Input = styled.input`
  width: 5em;
  padding: 0.275em 0.55em;
  margin: 0.4em;
  border-radius: 0.275em;
  border: rgba(170, 60, 20, 1) 1px solid;
`;

const DateRangeSelector = makeDateRange(Input);

export default class extends Component {
  static displayName = "DateRangeStory";

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      range: [0, Date.now()]
    };

    this.handleUpdater = this.handleUpdater.bind(this);
  }

  handleUpdater = (e, v) => {
    console.info(`Update fields: [${v}]`)
    this.setState({range: [...v]})
  };

  render() {
    const {
      state: { range },
      handleUpdater
    } = this;
    return (
      <div>
        <label>Current value {`${range}` || '"undefined"'}</label>
        <DateRangeSelector value={range || null} onChange={handleUpdater} />
        <button onClick={() => handleUpdater({}, [0, Date.now()])}>
          Set default
        </button>
      </div>
    );
  }
}
