import React, { Component } from "react";
import PropTypes from "prop-types";

const partMatch = new RegExp(
  /^(?:[0-3]|$)(?:[0-9]|$)(?:\.|$)(?:[01]|$)(?:\d|$)(?:\.|$)(?:[12]|$)(?:\d|$)(?:\d|$)(?:\d|$)/
);
const fullMatch = new RegExp(/^([0-3]\d)\.([01]\d)\.(19\d{2}|20\d{2})$/);

const sumMatrix = (r, a) =>
  r.map((b, i) => parseInt(`${a[i]}`) + parseInt(`${b}`));

const getFmtDate = d =>
  `${("0" + (d.getDate() + 1)).slice(-2)}.${("0" + (d.getMonth() + 1)).slice(-2)}.${d.getFullYear()}`;

export default WrappedComponent =>
  class extends Component {
    static displayName = `asDate(${WrappedComponent.displayName ||
      "UnknownComponent"})`;

    static propTypes = {
      children: PropTypes.node,
      value: PropTypes.number
    };

    static getDerivedStateFromProps(props) {
      const _d = new Date();
      _d.setDate(props.value)
      return { value: _d };
    }

    constructor(props) {
      super(props);
      const fmtDate = new Date();

      fmtDate.setDate(props.value);
      
      this.state = {
        value: fmtDate,
        unsavedValue: `${getFmtDate(fmtDate) || ""}`
      };
      this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
      const _d = new Date()
      _d.setDate(this.props.value)
      if (
        this.state.value !== this.props.value) &&
        prevProps.value !== this.props.value
      ) {
        this.setState({
          unsavedValue: getFmtDate(_d)
        });
      }
    }

    handleUpdate(e, exValue) {
      e.persist();
      const newValue = e.target && e.target.value || exValue || "";

      const checker = () => {
        const { unsavedValue } = this.state;
        if (fullMatch.test(unsavedValue)) {
          this.setState({
            errorMsg: null
          });
          const dateArr = unsavedValue.split(".").reverse();
          const repairDate = [dateArr, [0, -1, 0]].reduce(sumMatrix);

          const val = Date.UTC(...repairDate);

          this.props.onChange(e, val);
        } else if (partMatch.test(unsavedValue) && unsavedValue.length < 11) {
          this.setState({
            errorMsg: null
          });
        } else {
          this.setState({
            errorMsg: 'Дата має бути вказана у форматі "ДД.ММ.РРРР"'
          });
        }
      };

      this.setState({ unsavedValue: newValue }, checker);
    }

    render() {
      const {
        state: { unsavedValue, errorMsg = null }
      } = this;

      return (
        <WrappedComponent
          {...this.props}
          value={unsavedValue}
          onChange={this.handleUpdate}
          errorMsg={errorMsg}
        />
      );
    }
  };
