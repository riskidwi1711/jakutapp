import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import AddSaksi from "./Form/AddSaksi";
import AddKorsak from "./Form/AddKorsak";
import AddKorwe from "./Form/AddKorwe";
import AddKorte from "./Form/AddKorte";
import AddKortps from "./Form/AddKortps";
import AddPemilih from "./Form/AddPemilih";
import AddTokoh from "./Form/AddTokoh";
import AddTps from "./Form/AddTps";
import AddPartai from "./Form/AddPartai";
import AdddPresiden from "./Form/AddPresiden";
import AddDprri from "./Form/AddDprri";
import AddDpd from "./Form/AddDpd";
import AddDprd from "./Form/AddDprd";
import AddUser from "./Form/AddUser";
import AddEvent from "./Form/AddEvent";

function Modal({ current_menu }) {
    const formByMenu = () => {
        switch (current_menu) {
            case "saksi":
                return <AddSaksi param={"saksi"} />;
            case "korsak":
                return <AddSaksi param={"korsak"} />;
            case "korwe":
                return <AddSaksi param={"korwe"} />;
            case "korte":
                return <AddSaksi param={"korte"} />;
            case "kortps":
                return <AddSaksi param={"kortps"} />;
            case "pemilih":
                return <AddSaksi param={"dcpt"} />;
            case "tokoh":
                return <AddSaksi param={"tokoh"} />;
            case "datatps":
                return <AddTps />;
            case "master/partai":
                return <AddPartai />;
            case "master/presiden":
                return <AdddPresiden />;
            case "master/dprri":
                return <AddDprri />;
            case "master/dprdpro":
                return <AddDprd />;
            case "master/dpd":
                return <AddDpd />;
            case "user":
                return <AddUser />;
            case "acara":
                return <AddEvent />;
            default:
                return <div>default</div>;
                break;
        }
    };

    return (
        <>
            <div
                className="modal fade"
                id="staticBackdrop"
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
                                Tambah data {current_menu}
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

export default Modal;
