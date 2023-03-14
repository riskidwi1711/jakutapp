import Card from "@/Components/Card/Card";
import ChartSurvey from "@/Components/Chart/ChartSurvey";
import PageTitle from "@/Components/PageTitle";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import { post } from "jquery";
import React, { useEffect, useState } from "react";

function Detail(props) {
    useEffect(() => {
        const interval = setInterval(() => {
            Inertia.reload("chart", {
                preserveScroll: true,
                preserveState: true,
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    const [selectedType, setSelected] = useState("");
    const [multiCount, setMultiCount] = useState([1]);
    const [choice, setChoice] = useState([]);
    const [state, setState] = useState();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name == "file") {
            setState({ ...state, [name]: event.target.files[0] });
        } else {
            setState({ ...state, [name]: value });
        }
    };

    const handleChoice = (e) => {
        setChoice({ ...choice, [e.target.name]: e.target.value });
    };

    const handlePop = (inde, name) => {
        const newPeople = multiCount.filter((e, index) => index !== inde);

        setState((cur) => {
            const copy = { ...cur };
            delete copy[name];
            return copy;
        });
        setMultiCount(newPeople);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(
            `/addquestion/${props.id}`,
            {
                type: selectedType,
                data: state,
                choice: choice,
            },
            {
                onSuccess: (e) => {
                    setState({});
                    setChoice([]);
                },
            }
        );
    };

    const alphabet = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ];

    return (
        <DashboardLayout
            authe={props.auth}
            errors={props.errors}
            current_menu={"Forsight/Home".toLowerCase()}
        >
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <PageTitle
                            crumbs={`Home/Detail Survey`}
                            title={`${props.surveys.nama_survey}`}
                        />
                        <Card title={"Buat Pertanyaan Baru"}>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label className="form-label">
                                        Pilih Tipe Pertanyaan
                                    </label>
                                    <select
                                        onChange={(e) =>
                                            setSelected(e.target.value)
                                        }
                                        class="form-select"
                                        aria-label="Default select example"
                                    >
                                        <option selected>
                                            Pilih Salah Satu
                                        </option>
                                        <option value="short_answer">
                                            Jawaban singkat
                                        </option>
                                        <option value="multi_choice">
                                            Pilihan ganda
                                        </option>
                                    </select>
                                </div>
                                {selectedType === "short_answer" ? (
                                    <div className="form-group mb-3">
                                        <label className="form-label">
                                            Pertanyaan
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                            name="pertanyaan"
                                        />
                                    </div>
                                ) : selectedType === "multi_choice" ? (
                                    <div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">
                                                Pertanyaan
                                            </label>
                                            <input
                                                type="text"
                                                onChange={handleChange}
                                                className="form-control"
                                                name="pertanyaan"
                                            />
                                        </div>
                                        {multiCount.map((el, index) => {
                                            if (index < 3) {
                                                return (
                                                    <div className="d-flex align-items-end justify-content-center mb-2">
                                                        <div className="form-group w-100">
                                                            <label className="form-label">
                                                                Pilihan{" "}
                                                                {index + 1}
                                                            </label>
                                                            <input
                                                                onChange={
                                                                    handleChoice
                                                                }
                                                                type="text"
                                                                className="form-control"
                                                                name={index}
                                                            />
                                                        </div>
                                                        {index === 0 ? (
                                                            <div>
                                                                <button
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        e.preventDefault();
                                                                        if (
                                                                            multiCount.length <
                                                                            3
                                                                        ) {
                                                                            setMultiCount(
                                                                                (
                                                                                    current
                                                                                ) => [
                                                                                    ...current,
                                                                                    1,
                                                                                ]
                                                                            );
                                                                        }
                                                                    }}
                                                                    className={`btn btn-primary m-0 ms-2`}
                                                                >
                                                                    +1
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <button
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        e.preventDefault();
                                                                        handlePop(
                                                                            index,
                                                                            `pilihan_${
                                                                                index +
                                                                                1
                                                                            }`
                                                                        );
                                                                    }}
                                                                    className={`btn btn-danger m-0 ms-2`}
                                                                >
                                                                    <i className="fas fa-trash"></i>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                ) : (
                                    ""
                                )}

                                <button
                                    type="submit"
                                    className="btn btn-primary mt-4"
                                >
                                    Simpan Pertanyaan
                                </button>
                            </form>
                        </Card>
                        {props.question.map((el, index) => {
                            let id = el.id;
                            return (
                                <Card>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="mb-3">
                                            <span className="fw-bold fs-5">
                                                {index + 1}. {el.pertanyaan}
                                            </span>
                                            {props.propsQ.map((ell, no) => {
                                                if (el.id === ell.question_id) {
                                                    if (
                                                        ell.type ===
                                                        "multi_choice"
                                                    ) {
                                                        return (
                                                            <div className="ms-3 fs-5 mt-3">
                                                                {"-"}
                                                                {ell.value}
                                                            </div>
                                                        );
                                                    }
                                                }
                                            })}
                                        </div>
                                        <Link
                                            href={`/forsight/delete/q/${el.id}`}
                                            className="btn btn-danger m-0"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Link>
                                    </div>
                                    {props.chart[id] && <ChartSurvey
                                        datas={props.chart[id]}
                                        title={el.pertanyaan}
                                    />}
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
export default Detail;
