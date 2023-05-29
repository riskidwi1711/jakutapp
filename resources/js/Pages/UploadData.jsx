import React, { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import PageTitle from "@/Components/PageTitle";
import Card from "@/Components/Card/Card";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

function UploadData(props) {
    console.log(props.result);
    const { errors } = usePage().props;
    const [isSubmit, setIsSubmit] = useState(false);
    const [state, setState] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("/upload/saksi", state, {
            forceFormData: true,
            onSuccess: () => {
                setIsSubmit(true);
            },
        });
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name == "file") {
            setState({ ...state, [name]: event.target.files[0] });
        } else {
            setState({ ...state, [name]: value });
        }
    };

    const handleProses = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Apakah anda yakin?",
            text: "Data yang akan ter import ke dalam database!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Batal",
            confirmButtonText: "Ya!",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.post("/upload/saksi?process=true", state, {
                    forceFormData: true,
                    onSuccess: () => {
                        Swal.fire(
                            "Berhasil!",
                            "Data berhasil di inputkan.",
                            "success"
                        );
                        setIsSubmit(false);
                    },
                });
            }
        });
    };

    let columns = [];

    props.datas.map((e) => {
        e[0].map((er, index) => {
            columns.push({
                selector: (row) => row[index],
                sortable: true,
            });
        });
    });

    return (
        <DashboardLayout
            authe={props.auth}
            errors={props.errors}
            current_menu={"upload data"}
        >
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <PageTitle
                            crumbs="Home/Upload data"
                            title="Upload data"
                        />
                        <Card title={"Upload data"}>
                            <form onSubmit={handleSubmit}>
                                <div class="mb-3">
                                    <label for="formFile" class="form-label">
                                        Default file input example
                                    </label>
                                    <input
                                        class="form-control"
                                        type="file"
                                        name="file"
                                        onChange={handleChange}
                                        id="formFile"
                                    />
                                    {errors.file && (
                                        <div
                                            class="alert mt-2 alert-warning"
                                            role="alert"
                                        >
                                            {errors.file}
                                        </div>
                                    )}
                                </div>
                                <div className="d-flex justify-content-between flex-md-row flex-column">
                                    <div className="d-flex flex-md-row flex-column gap-2">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Preview
                                        </button>
                                        <button
                                            onClick={(e) => handleProses(e)}
                                            className="btn btn-success  mt-md-0"
                                        >
                                            Proses Upload
                                        </button>
                                    </div>
                                    <a
                                        href="/formatedfile"
                                        className="btn btn-success mt-2 mt-md-0"
                                    >
                                        Download format
                                    </a>
                                </div>
                            </form>
                        </Card>
                        {isSubmit && (
                            <Card>
                                <DataTable
                                    data={props.datas[0]}
                                    columns={columns}
                                    pagination
                                />
                            </Card>
                        )}
                        {props.result && (
                            <Card title={"Result"}>
                                <div className="row">
                                    <p>{props.result[0]}</p>
                                    <p>{props.result[1]}</p>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default UploadData;
