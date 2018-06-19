import React, { Component } from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import { makeDateField } from "../fields";

const Input = styled.input``;

const RangeBlock = styled.div``;

export default WrappedComponent =>
  class extends Component {
    static propTypes = {
      from: PropTypes.number,
      to: PropTypes.number,
      onChange: PropTypes.func
    };

    constructor(props) {
      super(props);
    }

    handleSelect(e, v1, v2) {
      console.log("update range", v1, v2);
    }

    render() {
      const {
        state: { from, to }
      } = this;
      return (
        <RangeBlock>
          <Input
            value={from}
            onChange={(e, v1) => {
              this.handleSelect(e, v1, null);
            }}
          />
          <Input
            value={to}
            onChange={(e, v2) => {
              this.handleSelect(e, null, v2);
            }}
          />
        </RangeBlock>
      );
    }
  };
