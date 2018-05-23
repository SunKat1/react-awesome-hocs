import React, { Component } from "react";
import PropTypes from "prop-types";

import { Form } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import makeDebounced from "../src/fields/makeDebounced";

class DebouncedComponent extends Component {
  static getDerivedStateFromProps({ value }, { externalValue }) {
    return { externalValue: value };
  }

  constructor(props) {
    super(props);

    this.state = {
      externalValue: null
    };

    this.DebouncedField = makeDebounced(Form.Input);
    this.DebouncedField.displayName = "CustomDebouncedField";
  }

  render() {
    const { externalValue } = this.state;

    return (
      <div
        style={{
          minHeight: "8em"
        }}
      >
        <h1>Current value: {externalValue || '"Not found"'}</h1>
        <this.DebouncedField
          value={externalValue || null}
          onChange={(e, v) => this.setState({ externalValue: v })}
          type="text"
        />
        <button
          onClick={() => {
            this.setState({
              externalValue: "default"
            });
          }}
        >
          Set default
        </button>
      </div>
    );
  }
}

export default DebouncedComponent;
