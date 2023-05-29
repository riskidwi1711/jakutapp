import React from "react";

function Footer(props) {
    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        <script>
                            document.write(new Date().getFullYear())
                        </script>{" "}
                        © Dashboard Cave Man.
                    </div>
                    <div className="col-sm-6">
                        <div className="text-sm-end d-none d-sm-block">
                            Dirancang & Dikembangkan oleh Cave Man
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
