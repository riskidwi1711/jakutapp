import React, { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, useForm, usePage } from "@inertiajs/inertia-react";
import {
    LoadCanvasTemplate,
    loadCaptchaEnginge,
    validateCaptcha,
} from "react-simple-captcha";
import Swal from "sweetalert2";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        chaptcha: "",
        remember: "",
    });

    const { flash } = usePage().props;

    useEffect(() => {
        loadCaptchaEnginge(4);
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const [showPass, setShowPass] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        if (validateCaptcha(data.chaptcha)) {
            loadCaptchaEnginge(4);
            post(route("login"));
        } else {
            loadCaptchaEnginge(4);
            Swal.fire("GAGAL!", "Chaptcha yang dimasukan salah.", "error");
        }
    };

    return (
        <div className="account-pages my-5 pt-sm-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        {flash.message && (
                            <div class="alert alert-warning" role="alert">
                                {flash.message}
                            </div>
                        )}
                        <div className="card overflow-hidden">
                            <div className="bg-primary bg-soft">
                                <div className="row">
                                    <div className="col-7">
                                        <div className="text-primary p-4">
                                            <h5 className="text-primary">
                                                Selamat Datang !
                                            </h5>
                                            <p>
                                                Masukan email dan password untuk
                                                dapat mengunjungi dashboard.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-5 align-self-end">
                                        <img
                                            src="assets/images/profile-img.png"
                                            alt=""
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <div className="auth-logo">
                                    <a
                                        href="index.html"
                                        className="auth-logo-light"
                                    >
                                        <div className="avatar-md profile-user-wid mb-4">
                                            <span className="avatar-title rounded-circle bg-light">
                                                <img
                                                    src="assets/images/logo-light.svg"
                                                    alt=""
                                                    className="rounded-circle"
                                                    height="34"
                                                />
                                            </span>
                                        </div>
                                    </a>

                                    <a
                                        href="index.html"
                                        className="auth-logo-dark"
                                    >
                                        <div className="avatar-md profile-user-wid mb-4">
                                            <span className="avatar-title rounded-circle bg-light">
                                                <img
                                                    src="assets/images/logo-light.svg"
                                                    alt=""
                                                    className="rounded-circle"
                                                    height="34"
                                                />
                                            </span>
                                        </div>
                                    </a>
                                </div>
                                <div className="p-2">
                                    <form
                                        className="form-horizontal"
                                        onSubmit={submit}
                                    >
                                        <div className="mb-3">
                                            <label
                                                htmlFor="username"
                                                className="form-label"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                value={data.email}
                                                placeholder="Enter username"
                                                name="email"
                                                autoComplete="username"
                                                onChange={onHandleChange}
                                            />
                                            <InputError
                                                message={errors.email}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label">
                                                Password
                                            </label>
                                            <div className="input-group auth-pass-inputgroup">
                                                <input
                                                    type={
                                                        showPass
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    className="form-control"
                                                    value={data.password}
                                                    name="password"
                                                    placeholder="Enter password"
                                                    autoComplete="current-password"
                                                    onChange={onHandleChange}
                                                />
                                                <button
                                                    className="btn btn-light "
                                                    type="button"
                                                    id="password-addon"
                                                    onClick={(e) =>
                                                        setShowPass(!showPass)
                                                    }
                                                >
                                                    <i className="mdi mdi-eye-outline"></i>
                                                </button>
                                            </div>
                                            <InputError
                                                message={errors.password}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <LoadCanvasTemplate />
                                            <div className="input-group auth-pass-inputgroup mt-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Masukan Chaptcha diatas"
                                                    value={data.chaptcha}
                                                    name="chaptcha"
                                                    onChange={onHandleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-3 d-grid">
                                            <PrimaryButton
                                                className="btn btn-primary waves-effect waves-light"
                                                processing={processing}
                                            >
                                                Log in
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3 text-center">
                            <div>
                                <p>
                                     {" "}
                                    <Link
                                        href="/register"
                                        class="fw-medium text-primary"
                                    >
                                        {" "}
                                        Daftar akses{" "}
                                    </Link>{" "}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
