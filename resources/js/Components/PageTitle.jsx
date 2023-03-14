import React from "react";
import Col from "./Col/Col";
import Row from "./Col/Row";

function PageTitle({title, crumbs}) {
    return (
        <Row>
            <Col vw="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18">{title}</h4>

                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item active">{crumbs}</li>
                        </ol>
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default PageTitle;
