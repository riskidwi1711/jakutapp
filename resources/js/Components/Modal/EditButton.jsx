import React from "react";

function EditButton({ title, click, row }) {
    return (
        <button
            onClick={() => click(row)}
            type="button"
            className="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#modalEdit"
        >
            {title}
        </button>
    );
}

export default EditButton;
