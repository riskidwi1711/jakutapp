import { Link } from "@inertiajs/inertia-react";
import React from "react";

function ButtonMenu({title, icon, color, href, val}) {
    return (
        <Link href={href} className={`btn ${color} m-0 w-100 position-relative`}>
            <span class="position-absolute top-0 start-100 p-2 translate-middle badge rounded-full bg-danger">
                {val}
                <span class="visually-hidden">unread messages</span>
            </span>
            <div className="d-flex flex-column p-1">
                <i className={`fas ${icon} mb-1 fs-4`}></i>
                <p className="m-0 p-0">{title}</p>
            </div>
        </Link>
    );
}

export default ButtonMenu;
