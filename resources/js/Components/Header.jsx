import { Link, usePage } from "@inertiajs/inertia-react";
import moment, { now } from "moment";
import React, { useEffect, useState } from "react";

function Header({ auth }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { notification, total_notif } = usePage().props;

  const goFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    isFullScreen
      ? document.exitFullscreen()
      : document.body.requestFullscreen();
  };
  useEffect(() => {
    $("#side-menu").metisMenu();
  });

  const handleclick = (e) => {
    e.preventDefault(),
      $("body").toggleClass("sidebar-enable"),
      992 <= $(window).width()
        ? $("body").toggleClass("vertical-collpsed")
        : $("body").removeClass("vertical-collpsed");
  };

  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex">
          <div className="navbar-brand-box">
            <Link href="/" className="logo logo-dark">
              <span className="logo-sm">
                <img src="/assets/images/logo.svg" alt="" height="22" />
              </span>
              <span className="logo-lg">
                <img src="/assets/images/logo-dark.png" alt="" height="17" />
              </span>
            </Link>

            <Link href="/" className="logo logo-light">
              <span className="logo-sm">
                <img src="/assets/images/logo-light.svg" alt="" height="28" />
              </span>
              <span className="logo-lg">
                <img src="/assets/images/logo-light.png" alt="" height="28" />
              </span>
            </Link>
          </div>

          <button
            type="button"
            className="btn btn-sm px-3 font-size-16 header-item waves-effect"
            id="vertical-menu-btn"
            onClick={handleclick}
          >
            <i className="fa fa-fw fa-bars"></i>
          </button>

          <form className="app-search d-none d-lg-block">
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                placeholder="Cari..."
              />
              <span className="bx bx-search-alt"></span>
            </div>
          </form>
        </div>

        <div className="d-flex">
          <div class="dropdown d-inline-block">
            <button
              type="button"
              class="btn header-item noti-icon waves-effect"
              id="page-header-notifications-dropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="bx bx-bell bx-tada"></i>
              <span class="badge bg-danger rounded-pill">{total_notif.length}</span>
            </button>
            <div
              class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
              aria-labelledby="page-header-notifications-dropdown"
            >
              <div class="p-3">
                <div class="row align-items-center">
                  <div class="col">
                    <h6 class="m-0" key="t-notifications">
                      {" "}
                      Notifikasi{" "}
                    </h6>
                  </div>
                  <div class="col-auto">
                    <Link href={route("notifications")} class="small" key="t-view-all">
                      {" "}
                      Lihat semua
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                {notification.map((e) => {
                  return (
                    <a
                      key={e.id}
                      class="text-reset notification-item"
                    >
                      <div class="d-flex justify-content-between">
                        <div class="avatar-xs me-3">
                          <span class="avatar-title bg-primary rounded-circle font-size-16">
                            <i class="bx bx-notification"></i>
                          </span>
                        </div>
                        <div class="flex-grow-1" style={{maxWidth:"83%"}}>
                          <h6 class="mb-1" key="t-your-order">
                            {e.title}
                          </h6>
                          <div class="font-size-12 text-muted">
                            <p class="mb-1" key="t-grammer">
                              {e.data}
                            </p>
                            <p class="mb-0">
                              <i class="mdi mdi-clock-outline"></i>{" "}
                              <span key="t-min-ago">
                                {moment(e.created_at).fromNow()}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
              <div class="p-2 border-top d-grid">
                <Link
                  class="btn btn-sm btn-link font-size-14 text-center"
                  href={route("notifications")}
                >
                  <i class="mdi mdi-arrow-right-circle me-1"></i>{" "}
                  <span key="t-view-more">Lebih banyak...</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="dropdown d-inline-block">
            <button
              type="button"
              className="btn header-item waves-effect"
              id="page-header-user-dropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="d-none d-xl-inline-block ms-1" key="t-henry">
                {auth.user.name}
              </span>
              <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-end">
              <a className="dropdown-item" href="#">
                <i className="bx bx-user font-size-16 align-middle me-1"></i>{" "}
                <span key="t-profile">Profile</span>
              </a>
              <div className="dropdown-divider"></div>
              <Link
                method="post"
                href={route("logout")}
                as="button"
                className="dropdown-item text-danger"
              >
                <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i>{" "}
                <span key="t-logout">Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
