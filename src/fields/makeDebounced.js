import React, { Component } from "react";
import PropTypes from "prop-types";

import { debounce, omit } from "lodash";

const makeDebounced = WrappedComponent => {
  class Wrapper extends Component {
    constructor(props) {
      super(props);

      this.state = {
        value: null,
        debouncedProps: omit(props, ["onChange", "value"])
      };

      this._debounceChange = this._debounceChange.bind(this);
      this.sendExternalChange = debounce(props.onChange, props.delay);
    }
    static propTypes = {
      delay: PropTypes.number,
      onChange: PropTypes.func.isRequired,
      value: PropTypes.any.isRequired
    };

    static defaultProps = {
      delay: 1500
    };

    static getDerivedStateFromProps = (
      { delay, value, ...props },
      prevState
    ) => ({
      value,
      debouncedProps: omit(props, ["onChange", "value"])
    });

    _debounceChange(e, { value }) {
      console.log("up", e, value, this.state);
      this.setState({ value }, () => this.sendExternalChange(e, value));
    }

    render() {
      const {
        state: { value, debouncedProps }
      } = this;
      return (
        <WrappedComponent
          {...{
            ...debouncedProps,
            value,
            onChange: this._debounceChange
          }}
        />
      );
    }
  }

  return Wrapper;
};

export default makeDebounced;
