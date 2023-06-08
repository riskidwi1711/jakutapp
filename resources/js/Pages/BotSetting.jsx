import Card from "@/Components/Card/Card";
import PageTitle from "@/Components/PageTitle";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Inertia } from "@inertiajs/inertia";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

function BotSetting(props) {
  const [bot_api, setbot_api] = useState("");
  const [qr, setQr] = useState(null);
  const [logs, setLog] = useState([]);

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post("/pengaturan/bot-telegram", { bot_api: bot_api });
  };

  window.Echo.channel("wa-channel").listen("WaApi", (e) => {
    if (e.messages.type === "qr") {
      QRCode.toDataURL(e.messages.qr).then((url) => setQr(url));
    }
console.log(qr);
    setLog([...logs, e.messages.msg]);
  });

  return (
    <DashboardLayout
      authe={props.auth}
      errors={props.errors}
      current_menu={"bot-setting"}
    >
      <div className="main-content">
        <div className="page-content row">
          <div className="container-fluid col-6 justify-content-center align-items-center">
            <PageTitle crumbs="Home/Bot Setting" title="WhatsApp Bot" />
            <Card title={"Koneksi ke WhatsApp bot"} >
              {props.status.value == 0 ? (
                <div>
                  <div className="row  justify-content-center align-items-center ">
                   <div className="col-lg-12 d-flex justify-content-center align-items-end">
                {qr != null && (
                  <img src={qr} className="img-fluid" alt="" srcset="" />
                )}
              </div>
              <div>
              <div className="mt-4 col-lg-12 d-flex flex-column justify-content-start align-items-start bg-light p-4 rounded-4" >
                <h4>Logs</h4>
                <div style={{height:200+'px',width:100+'%', overflowY:'scroll'}}>
                  {qr == null && "Connecting..."}
                  {logs.map((e) => {
                    return <p className="p-0 m-0">{e}</p>;
                  })}
                </div>
              </div>
              </div>
                </div>
                </div>
              ) : (
                <h6>
                  Bot sudah terkoneksi, Jika terjadi masalah silahkan disconnect
                  dari perangkat anda...
                </h6>
              )}
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default BotSetting;
