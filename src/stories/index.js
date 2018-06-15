import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import DebouncedComponent from "./DebouncedField";
import SemanticDebouncedComponent from "./DebouncedField_SemanticUI";
import StyledDebouncedComponent from "./DebouncedField_styled";

storiesOf("DebouncedChanger", module)
  .add("with input and local state", () => (
    <DebouncedComponent
      onChange={action("debounce update")}
      value="some value"
    />
  ))
  .add("with Semantic-UI-Input and local state", () => (
    <SemanticDebouncedComponent
      onChange={action("debounce update")}
      value="some value"
    />
  ))
  .add("with styled component", () => (
    <StyledDebouncedComponent
      onChange={action("debounce update")}
      value="some value"
    />
  ));

storiesOf("DatePicker", module)
  .add("as basic field", () => <input />)
  .add("as calendar-block", () => <div />)
  .add("as basic range field", () => <div />)
  .add("with selector portal", () => <input />)
  .add("with range selector portal", () => <input />);
