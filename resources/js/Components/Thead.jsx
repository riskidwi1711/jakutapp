import React from "react";

function Thead({children}) {
    return (
        <thead class="table-light">
            <tr>
                {children}
            </tr>
        </thead>
    );
}

export default Thead;
