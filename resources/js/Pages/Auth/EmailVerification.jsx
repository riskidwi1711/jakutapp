import React, {  } from "react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, useForm, usePage } from "@inertiajs/inertia-react";

function EmailVerification(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
    });
    const { flash } = usePage().props;

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("reverify"));
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
                                                Masukan email untuk mengirimkan
                                                link verifikasi email.
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
                                        onSubmit={handleSubmit}
                                        className="form-horizontal"
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

                                        <div className="mt-3 d-grid">
                                            <PrimaryButton
                                                className="btn btn-primary waves-effect waves-light"
                                                type="submit"
                                            >
                                                Kirim link
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3 text-center">
                            <div>
                                <p>
                                    Belum memiliki akun ?{" "}
                                    <Link
                                        href="/register"
                                        class="fw-medium text-primary"
                                    >
                                        {" "}
                                        Daftar sekarang{" "}
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

export default EmailVerification;
