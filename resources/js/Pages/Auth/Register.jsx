import React, { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    no_handphone: "",
    keterangan: "",
    telegram_id: "",
    password_confirmation: "",
  });

  const { flash } = usePage().props;

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
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

  const submit = (e) => {
    e.preventDefault();

    post(route("register"));
  };

  return (
    <GuestLayout>
      <Head title="Daftar" />

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
                        <h5 className="text-primary">Selamat Datang !</h5>
                        <p>
                          Daftarkan email dan password anda agar mendapatkan
                          akses.
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
                    <a href="index.html" className="auth-logo-light">
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

                    <a href="index.html" className="auth-logo-dark">
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
                    <form onSubmit={submit}>
                      <div>
                        <InputLabel forInput="name" value="Nama" />

                        <TextInput
                          type="text"
                          name="name"
                          value={data.name}
                          className="form-control"
                          autoComplete="name"
                          isFocused={true}
                          handleChange={onHandleChange}
                          required
                        />

                        <InputError message={errors.name} className="mt-2" />
                      </div>

                      <div className="mt-4">
                        <InputLabel forInput="email" value="Alamat Email" />

                        <TextInput
                          type="email"
                          name="email"
                          value={data.email}
                          className="form-control"
                          autoComplete="username"
                          handleChange={onHandleChange}
                          required
                        />

                        <InputError message={errors.email} className="mt-2" />
                      </div>

                      <div className="mt-4">
                        <InputLabel
                          forInput="no_handphone"
                          value="No Telepon"
                        />

                        <TextInput
                          type="phone"
                          name="no_handphone"
                          value={data.no_handphone}
                          className="form-control"
                          autoComplete="phone"
                          handleChange={onHandleChange}
                          required
                        />

                        <InputError
                          message={errors.no_handphone}
                          className="mt-2"
                        />
                      </div>

                      <div className="mt-4">
                        <InputLabel
                          forInput="telegram_id"
                          value="Telegram ID"
                        />

                        <TextInput
                          type="text"
                          name="telegram_id"
                          value={data.telegram_id}
                          className="form-control"
                          autoComplete="telegram_id"
                          handleChange={onHandleChange}
                          required
                        />

                        <InputError
                          message={errors.telegram_id}
                          className="mt-2"
                        />
                      </div>

                      <div className="mt-4">
                        <InputLabel forInput="keterangan" value="Keterangan" />

                        <TextInput
                          type="text"
                          name="keterangan"
                          value={data.keterangan}
                          className="form-control"
                          autoComplete="keterangan"
                          handleChange={onHandleChange}
                          required
                        />

                        <InputError
                          message={errors.keterangan}
                          className="mt-2"
                        />
                      </div>

                      <div className="d-grid mt-4">
                        <PrimaryButton
                          className="btn btn-primary waves-effect waves-ligt w-full"
                          processing={processing}
                        >
                          Daftar Akses
                        </PrimaryButton>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
