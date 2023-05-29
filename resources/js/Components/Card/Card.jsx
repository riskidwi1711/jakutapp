import { Link } from "@inertiajs/inertia-react";
import React from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import CsvDownload from "react-json-to-csv";
import Row from "../Col/Row";
import ModalButton from "../Modal/ModalButton";

function Card({ title, downloadDta, addData, children, data, uploadData }) {

    var today = new Date()

    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const handle = useFullScreenHandle();
    return (
        <FullScreen handle={handle}>
            <div className="card">
                <div className="card-header bg-white">
                    <div className=" d-flex flex-column flex-sm-column flex-md-row justify-content-between align-items-start">
                        <h4 className="card-title mt-3">{title}</h4>
                        <div className="d-flex flex-column flex-sm-column flex-md-row gap-2 justify-content-start align-items-start">
                            {addData ? (
                                <ModalButton title={"Tambah Data"} />
                            ) : (
                                ""
                            )}
                            {uploadData && (
                                <Link className="btn btn-success" href="/upload/saksi">
                                    <i class="fas fa-file-excel"></i> Upload
                                    Data Excel
                                </Link>
                            )}
                            {downloadDta ? (
                                <CsvDownload
                                    data={data}
                                    filename={`Export data ${date}`}
                                    delimiter={','}
                                    children={
                                        <>
                                            <i class="fas fa-file-csv"></i>{" "}
                                            Download CSV
                                        </>
                                    }
                                    className="btn btn-success"
                                />
                            ) : (
                                ""
                            )}
                            <button
                                onClick={
                                    handle.active ? handle.exit : handle.enter
                                }
                                className="btn btn-primary px-3 py-2"
                            >
                                {!handle.active ? (
                                    <i className="bx bx-fullscreen"></i>
                                ) : (
                                    <i class="bx bx-exit-fullscreen"></i>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <Row>{children}</Row>
                </div>
            </div>
        </FullScreen>
    );
}

export default Card;
