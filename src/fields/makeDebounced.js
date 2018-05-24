import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { debounce, omit } from 'lodash';

const makeDebounced = (WrappedComponent) => {
  class Wrapper extends Component {
    static propTypes = {
      delay: PropTypes.number,
      onChange: PropTypes.func.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    };

    static defaultProps = {
      delay: 1500,
    };

    constructor(props) {
      super(props);

      this.state = {
        value: null,
        debouncedProps: omit(props, ['onChange', 'value']),
      };
      this.sendExternalChange = debounce(props.onChange, props.delay);
    }

    static getDerivedStateFromProps = ({ delay, value, ...props }) => ({
      value,
      debouncedProps: omit(props, ['onChange', 'value']),
    });

    componentDidUpdate(prevProps) {
      if (prevProps.value !== this.props.value) {
        this.sendExternalChange.cancel();
      }
    }

    render() {
      const {
        state: { value, debouncedProps },
      } = this;
      return (
        <WrappedComponent
          {...{
            ...debouncedProps,
            value,
            onChange: (e, { value }) => this.setState({ value }, () =>
              this.sendExternalChange(e, value)),
          }}
        />
      );
    }
  }

  return Wrapper;
};

export default makeDebounced;
