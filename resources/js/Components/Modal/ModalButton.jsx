import React from 'react';

function ModalButton({title}) {
    return (
        <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
            >
                {title}
            </button>
    );
}

export default ModalButton;