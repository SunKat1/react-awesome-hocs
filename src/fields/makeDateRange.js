import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";

import styled from "styled-components";

import { makeDateField } from "../fields";

const RangeBlock = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const makeDateRange = WrappedInput =>
  class extends Component {
    static propTypes = {
      from: PropTypes.number,
      to: PropTypes.number,
      onChange: PropTypes.func
    };

    static getDerivedStateFromProps(nextProps, pState) {
      const { value } = nextProps;
      return {
        savedFrom: value[0] || null,
        savedTo: value[1] || null
      };
    }

    constructor(props) {
      super(props);

      this.state = {
        savedFrom: props.value[0],
        savedTo: props.value[1],
        from: props.value[0],
        to: props.value[1]
      };

      /**
       * @property
       * @type {func}
       */
      this.dInput = makeDateField(WrappedInput);
    }

    componentDidUpdate(prevProps, prevState) {
      const {
        state: { from, to, savedFrom, savedTo }
      } = this;
      if (from !== savedFrom || to !== savedTo) {
        this.setState({
          from: savedFrom,
          to: savedTo
        });
      }
    }

    handleSelect(e, v1, v2) {
      const updateData = v1 ? { from: v1 } : { to: v2 };

      const checkBeforeUpdate = () => {
        const { from, to } = this.state;

        // console.log(`current values:`, from, to);

        if (from && to) {
          this.props.onChange(e, [from, to]);
        }
      };

      // console.log(`new range: ${updateData.from} - ${updateData.to}`)

      this.setState(updateData, checkBeforeUpdate);
    }

    render() {
      const {
        state: { from, to }
      } = this;
      return (
        <RangeBlock>
          <this.dInput
            value={from}
            onChange={(e, v1) => {
              this.handleSelect(e, v1, null);
            }}
          />
          <this.dInput
            value={to}
            onChange={(e, v2) => {
              this.handleSelect(e, null, v2);
            }}
          />
        </RangeBlock>
      );
    }
  };

export default makeDateRange;
