import React, { Component } from "react";
import PropTypes from "prop-types";

import { debounce, omit } from "lodash";

const makeDebounced = WrappedComponent =>
  class extends Component {
    static propTypes = {
      delay: PropTypes.number,
      onChange: PropTypes.func.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      unsavedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };

    static defaultProps = {
      delay: 1500,
      value: null,
      unsavedValue: null
    };

    static displayName = `WithDebounce(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      "UnknownComponent"})`;

    constructor(props) {
      super(props);

      this.state = {
        value: props.value || "",
        unsavedValue: props.value || "",
        debouncedProps: omit(props, ["onChange", "value"])
      };
      this.handleUpdate = this.handleUpdate.bind(this);
      this.sendExternalChange = debounce(props.onChange, props.delay);
    }

    static getDerivedStateFromProps = ({ delay, value, ...props }, state) => {
      return {
        value: state.value || "",
        debouncedProps: omit(props, ["onChange", "value", "unsavedValue"])
      };
    };

    componentDidUpdate(prevProps, prevState) {
      if (this.state.unsavedValue === this.props.value) {
        this.sendExternalChange.cancel();
      } else if (
        this.state.value !== this.props.value &&
        prevProps.value !== this.props.value
      ) {
        this.setState(
          {
            unsavedValue: this.props.value || ""
          },
          this.sendExternalChange.cancel
        );
      }
    }

    handleUpdate(e, addValue = {}) {
      const unvalidatedValue = addValue.value || e.target.value || "";

      const sendEvent = () => {
        this.sendExternalChange(e, this.state.unsavedValue);
      };
      this.setState({ unsavedValue: unvalidatedValue }, sendEvent);
    }

    render() {
      const {
        state: { unsavedValue, debouncedProps }
      } = this;
      return (
        <WrappedComponent
          {...debouncedProps}
          value={unsavedValue}
          onChange={this.handleUpdate}
        />
      );
    }
  };

export default makeDebounced;
