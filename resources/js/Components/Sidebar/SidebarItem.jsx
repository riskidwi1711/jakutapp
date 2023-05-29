import { Link } from "@inertiajs/inertia-react";
import React from "react";

function SidebarItem({ current_menu }) {
    return (
        <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">Menu</li>
            <li className={`${current_menu == "dashboard" && "mm-active"}`}>
                <Link href="/dashboard" className="waves-effect">
                    <i className="bx bx-home-circle"></i>
                    <span key="t-dashboards">Dashboards</span>
                </Link>
            </li>
            <li className={`${current_menu == "petadata" && "mm-active"}`}>
                <Link href="/petadata" className="waves-effect">
                    <i className="bx bx-map-alt"></i>
                    <span key="t-dashboards">Peta Data </span>
                </Link>
            </li>
            <li className={`${current_menu == "capil" && "mm-active"}`}>
                <Link href="/pdkependudukan" className="waves-effect">
                    <i className="bx bx-map-alt"></i>
                    <span key="t-dashboards">Peta Data Kependudukan</span>
                </Link>
            </li>
            <li className="menu-title">Data Tim Pemenangan</li>
            <li className={`${current_menu == "saksi" && "mm-active"}`}>
                <Link
                    href="/datatable/saksi"
                    key="t-tui-calendar"
                    className="waves-effect"
                >
                    <i className="bx bx-sitemap"></i>

                    <span key="t-dashboards">Data Saksi</span>
                </Link>
            </li>
            <li className={`${current_menu == "korsak" && "mm-active"}`}>
                <Link href="/datatable/korsak" className="waves-effect">
                    <i className="bx bx-sitemap"></i>

                    <span key="t-dashboards">Koordinator Saksi</span>
                </Link>
            </li>
            <li className={`${current_menu == "korwe" && "mm-active"}`}>
                <Link href="/datatable/korwe" className="waves-effect">
                    <i className="bx bx-sitemap"></i>

                    <span key="t-dashboards">Koordinator RW</span>
                </Link>
            </li>
            <li className={`${current_menu == "korte" && "mm-active"}`}>
                <Link href="/datatable/korte" className="waves-effect">
                    <i className="bx bx-sitemap"></i>

                    <span key="t-dashboards">Koordinator RT</span>
                </Link>
            </li>
            {/* <li className={`${current_menu == "kortps" && "mm-active"}`}>
                <Link href="/datatable/kortps" className="waves-effect">
                    <i className="bx bx-sitemap"></i>
                    
                    <span key="t-dashboards">Koordinator TPS</span>
                </Link>
            </li> */}
            <li className={`${current_menu == "pemilih" && "mm-active"}`}>
                <Link href="/datatable/pemilih" className="waves-effect">
                    <i className="bx bx-sitemap"></i>

                    <span key="t-dashboards">Calon Pemilih</span>
                </Link>
            </li>
            <li className={`${current_menu == "tokoh" && "mm-active"}`}>
                <Link href="/datatable/tokoh" className="waves-effect">
                    <i className="bx bx-sitemap"></i>

                    <span key="t-dashboards">Data Tokoh</span>
                </Link>
            </li>
            <li className={`${current_menu == "dasawisma" && "mm-active"}`}>
                <Link href="/datatable/dasawisma" className="waves-effect">
                    <i className="bx bx-sitemap"></i>

                    <span key="t-dashboards">Dasawisma</span>
                </Link>
            </li>
            <li className="menu-title">Data Absen</li>
            <li className={`${current_menu == "absen" && "mm-active"}`}>
                <Link href="/absen" className="waves-effect">
                    <i class="bx bxs-user"></i>

                    <span key="t-dashboards">Absensi</span>
                </Link>
            </li>
            <li className={`${current_menu == "acara" && "mm-active"}`}>
                <Link href="/acara" className="waves-effect">
                <i class='bx bx-calendar-event' ></i>

                    <span key="t-dashboards">Data Acara</span>
                </Link>
            </li>
            {/* <li className="menu-title">Master Data</li>
            <li
                className={`${
                    current_menu == "master/presiden" && "mm-active"
                }`}
            >
                <Link
                    href="/datatable/ppwp"
                    className="waves-effect"
                    key="t-tui-calendar"
                    preserveScroll
                >
                    <i className="bx bxs-data"></i>

                    <span key="t-dashboards">Presiden</span>
                </Link>
            </li>
            <li className={`${current_menu == "master/partai" && "mm-active"}`}>
                <Link href="/datatable/partai" className="waves-effect">
                    <i className="bx bxs-data"></i>

                    <span key="t-dashboards">Partai</span>
                </Link>
            </li>
            <li className={`${current_menu == "master/dprri" && "mm-active"}`}>
                <Link href="/datatable/caleg-dprri" className="waves-effect">
                    <i className="bx bxs-data"></i>

                    <span key="t-dashboards">Caleg DPRRI</span>
                </Link>
            </li>
            <li
                className={`${current_menu == "master/dprdpro" && "mm-active"}`}
            >
                <Link href="/datatable/caleg-dprd-pro" className="waves-effect">
                    <i className="bx bxs-data"></i>
                    <span key="t-dashboards">Caleg DPRD PRO</span>
                </Link>
            </li>
            <li className={`${current_menu == "master/dpd" && "mm-active"}`}>
                <Link href="/datatable/caleg-dpd" className="waves-effect">
                    <i className="bx bxs-data"></i>
                    <span key="t-dashboards">Caleg DPD</span>
                </Link>
            </li> */}

            <li className="menu-title">Data Wilayah</li>
            <li className={`${current_menu == "datakecamatan" && "mm-active"}`}>
                <Link
                    href="/datawilayah/kecamatan"
                    key="t-tui-calendar"
                    className="waves-effect"
                >
                    <i className="bx bxs-map"></i>
                    <span key="t-dashboards">Kecamatan</span>
                </Link>
            </li>
            <li className={`${current_menu == "datakelurahan" && "mm-active"}`}>
                <Link href="/datawilayah/kelurahan" className="waves-effect">
                    <i className="bx bxs-map"></i>
                    <span key="t-dashboards">Kelurahan</span>
                </Link>
            </li>
            {/* <li className={`${current_menu == "datatps" && "mm-active"}`}>
                <Link href="/datawilayah/tps" className="waves-effect">
                    <i className="bx bxs-map"></i><span key="t-dashboards">TPS</span>
                </Link>
            </li> */}
            <li className="menu-title">Foresight</li>
            <li className={`${current_menu == "forsight/home" && "mm-active"}`}>
                <Link className="waves-effect" href="/forsight/home">
                    <i className="bx bx-poll"></i>
                    <span key="t-dashboards">Survey</span>
                </Link>
            </li>
            <li className="menu-title">Pengaturan</li>
            <li className={`${current_menu == "notifikasi" && "mm-active"}`}>
                <Link className="waves-effect" href="/notifikasi">
                    <i class="bx bxs-notification"></i>
                    <span key="t-dashboards">Notifikasi</span>
                </Link>
            </li>
            <li className={`${current_menu == "user" && "mm-active"}`}>
                <Link className="waves-effect" href="/users">
                    <i class="bx bxs-user"></i>
                    <span key="t-dashboards">Pengguna</span>
                </Link>
            </li>
            <li className={`${current_menu == "userregister" && "mm-active"}`}>
                <Link className="waves-effect" href="/registeredusers">
                    <i class="bx bxs-user"></i>
                    <span key="t-dashboards">Pengguna Mendaftar</span>
                </Link>
            </li>
            <li className={`${current_menu == "bot-setting" && "mm-active"}`}>
                <Link className="waves-effect" href="/pengaturan/bot-wa">
                    <i className="bx bxs-bot"></i>
                    <span key="t-dashboards">Bot WhatsApp</span>
                </Link>
            </li>
            {/* <li className={`${current_menu == "websetting" && "mm-active"}`}>
                <Link className="waves-effect" href="/pengaturan/web-setting">
                    <i className="bx bx-world"></i>
                    <span key="t-dashboards">Pengaturan Situs</span>
                </Link>
            </li> */}
        </ul>
    );
}

export default SidebarItem;
