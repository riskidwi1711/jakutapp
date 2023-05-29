import React from "react";

function TableLayout({children}) {
    return (
        <table class="table align-middle table-nowrap mb-0">
            {children}
        </table>
    );
}

export default TableLayout;
