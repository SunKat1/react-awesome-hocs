import React from "react";

const hasErrorMsg = (Wrapped, MessageComponent) => ({
  hasError,
  message,
  ...otherProps
}) => {
  if (hasError) {
    return (
      <>
        <MessageComponent content={message} />
        <Wrapped {...otherProps} />
      </>
    );
  } else {
    return <Wrapped {...otherProps} />;
  }
};

export default hasErrorMsg;
