import React from "react";
import { components } from "react-select";

const { ValueContainer, Placeholder } = components;

const CustomValueContainer = ({ children, ...props }) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, (child) =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  );
};

const CustomSelectStyle = {
  container: (provided, state) => ({
    ...provided,
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    textOverflow: "ellipsis",
    maxWidth: "90%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "initial",
    gridArea: "1/1",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    overflow: "visible",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    position: "absolute",
    top: state.hasValue || state.selectProps.inputValue ? -25 : "unset",
    transition: "top 0.1s, font-size 0.1s",
    paddingLeft: "5px",
    fontSize: (state.hasValue || state.selectProps.inputValue) && 13,
    backgroundColor:
      (state.hasValue || state.selectProps.inputValue) && "white",
    padding: (state.hasValue || state.selectProps.inputValue) && "0 4px",
    gridArea: (state.hasValue || state.selectProps.inputValue) && "1/1",
  }),
};

export { CustomValueContainer, CustomSelectStyle };
