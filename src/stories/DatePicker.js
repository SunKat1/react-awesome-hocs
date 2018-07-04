import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from 'redux';
import { makeDebounced, makeDateField } from "../fields";

import styled from 'styled-components';
import wrapErrorForField from "../fields/wrapErrorForField";

const Input = styled.input`
  border-color: ${({errorMsg}) => {
    if (errorMsg) { return 'red' } else { return 'blue' }
  }}
`;

const enhance = compose(makeDateField, wrapErrorForField)

const DateField = enhance(p => <Input {...p} />)

export default class extends Component {
  static displayName = `Story(DatePicker)`;

  static propTypes = {
    value: PropTypes.number,
  }

  constructor(props) {
    super(props);

    this.state = {
      externalValue: props.value
    };
  }

  render() {
    const { externalValue } = this.state;

    const dateUpdater = (e, v) => {
      this.setState({ externalValue: v }, this.props.onChange);
    };

    const setCurrentDate = () => {
      this.setState(
        {
          externalValue: Date.now()
        },
        this.props.onChange
      );
    };

    return (
      <div>
        <h1>Current value: {externalValue || '"Not found"'}</h1>
        <DateField value={externalValue} onChange={dateUpdater} type="text" />
        <button onClick={setCurrentDate}>Set current</button>
      </div>
    );
  }
}
