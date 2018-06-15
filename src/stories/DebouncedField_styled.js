import React, { Component } from "react";
import PropTypes from "prop-types";

import styled from 'styled-components';
import { makeDebounced } from "../fields";

const MyInput = styled.input`
  background: #c40;
`

const DebouncedField = makeDebounced(p => <MyInput {...p} />);
DebouncedField.displayName = "StyledDebouncedField";

export default class extends Component {
  static displayName = `Story(${DebouncedField.displayName || "Component"})`;
  static getDerivedStateFromProps({ value }, { externalValue }) {
    return { externalValue: externalValue };
  }

  constructor(props) {
    super(props);

    this.state = {
      externalValue: `${props.value}`
    };
  }

  render() {
    const { externalValue } = this.state;

    return (
      <div>
        <h1>Current value: {externalValue || '"Not found"'}</h1>
        <DebouncedField
          value={externalValue}
          onChange={(e, v) => {
            this.setState({ externalValue: v }, this.props.onChange);
          }}
          type="text"
        />
        <button
          onClick={() => {
            this.setState({ externalValue: "default" }, this.props.onChange);
          }}
        >
          Set default
        </button>
      </div>
    );
  }
}
