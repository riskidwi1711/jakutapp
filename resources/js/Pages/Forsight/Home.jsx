import Card from "@/Components/Card/Card";
import PageTitle from "@/Components/PageTitle";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { PhotoView } from "react-photo-view";
import Swal from "sweetalert2";

function Home(props) {
    const [state, setState] = useState({ user_created: "admin" });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name == "file") {
            setState({ ...state, [name]: event.target.files[0] });
        } else {
            setState({ ...state, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("/addsurvey", state);
    };
    return (
        <DashboardLayout
            authe={props.auth}
            errors={props.errors}
            current_menu={props.page.toLowerCase()}
        >
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <PageTitle
                            crumbs={`Home/ Forsight`}
                            title={`Forsight`}
                        />
                        <Card title={"Buat Survey Baru"}>
                            <form onSubmit={handleSubmit}>
                                <div class="mb-3">
                                    <label class="form-label">
                                        Nama Survey
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        class="form-control"
                                        name="nama_survey"
                                    />
                                </div>
                                <div class="mb-3">
                                    <label for="floatingTextarea">
                                        Deskripsi
                                    </label>
                                    <textarea
                                        onChange={handleChange}
                                        class="form-control"
                                        id="floatingTextarea"
                                        name="deskripsi"
                                    ></textarea>
                                </div>

                                <button type="submit" class="btn btn-primary">
                                    Simpan
                                </button>
                            </form>
                        </Card>
                        <div className="table-responsive">
                            <table class="table project-list-table table-nowrap align-middle table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nama Survey</th>
                                        <th scope="col">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.surveys.map((el) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <i class="fas fa-poll-h fs-1"></i>
                                                </td>
                                                <td>
                                                    <h5 class="text-truncate font-size-14">
                                                        <a
                                                            href="javascript: void(0);"
                                                            class="text-dark"
                                                        >
                                                            {el.nama_survey}
                                                        </a>
                                                    </h5>
                                                    <p class="text-muted mb-0">
                                                        {el.description}
                                                    </p>
                                                </td>
                                                <td className="d-flex gap-2">
                                                    <Link
                                                        href={`/forsight/detail/${el.id}`}
                                                        className="btn btn-primary"
                                                    >
                                                        <i className="fas fa-eye"></i>
                                                    </Link>
                                                    <Link
                                                        href={`/forsight/delete/s/${el.id}`}
                                                        className="btn btn-danger"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Home;
