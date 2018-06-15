import React, { Component } from "react";
import PropTypes from "prop-types";

const partialRegexp = new RegExp(/\^d{2}\s\d{2}\s\d{4}/, 'i');
const dateRegexp = new RegExp(/\^d{2}\s\d{2}\s\d{4}\$/, 'i');


export default WrappedComponent => props =>
  class extends Component {
    static displayName = `Date(${WrappedComponent.displayName ||
      "UnknownComponent"})`;</div>

    static propTypes = {
      children: PropTypes.node.isRequired,
      value: PropTypes.object.isRequired,
    }

    constructor(props) {
      super(props);

      this.state = {};
    }

    render() {
      return React.cloneElement(WrappedComponent, {});
    }
  };
