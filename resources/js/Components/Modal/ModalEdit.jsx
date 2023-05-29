import React, { useState } from "react";
import EditSaksi from "./FormEdit/EditSaksi";

function ModalEdit({ selectedId, current_menu }) {
    const [data, setData] = useState(selectedId);

    const formByMenu = () => {
        switch (current_menu) {
            case "saksi":
                return <EditSaksi row={selectedId} param={current_menu} />;
                break;
            case "korsak":
                return <EditSaksi row={selectedId} param={current_menu} />;
                break;
            case "korwe":
                return <EditSaksi row={selectedId} param={current_menu} />;
                break;
            case "korte":
                return <EditSaksi row={selectedId} param={current_menu} />;
                break;
            case "pemilih":
                return <EditSaksi row={selectedId} param={current_menu} />;
                break;
            case "tokoh":
                return <EditSaksi row={selectedId} param={current_menu} />;
                break;
            default:
                return <div>default</div>;
                break;
        }
    };

    return (
        <>
            <div
                className="modal fade"
                id="modalEdit"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                data-bs-backdrop="static"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Edit data
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">{formByMenu()}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalEdit;
