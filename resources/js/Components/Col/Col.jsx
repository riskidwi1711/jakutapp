import React from "react";

function Col({ vw, children }) {
    return (
        <div className={`${vw}`}>{children}</div>
    );
}

export default Col;
