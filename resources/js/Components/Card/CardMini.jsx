import { Inertia } from "@inertiajs/inertia";
import React, { useEffect } from "react";

function CardMini({ title, value, icons, data }) {
    useEffect(() => {
        const interval = setInterval(() => {
            Inertia.reload(data, {preserveScroll:true, preserveState: true});
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="card mini-stats-wid">
            <div className="card-body">
                <div className="d-flex">
                    <div className="flex-grow-1">
                        <p className="text-muted fw-medium">{title}</p>
                        <h4 className="mb-0">{value}</h4>
                    </div>

                    <div className="flex-shrink-0 align-self-center">
                        <div className="mini-stat-icon avatar-sm rounded-circle bg-primary">
                            <span className="avatar-title">
                                <i className={`bx ${icons} font-size-24`}></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardMini;
