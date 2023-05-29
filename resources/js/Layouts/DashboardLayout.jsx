import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Modal from "@/Components/Modal/Modal";
import ModalEdit from "@/Components/Modal/ModalEdit";
import RightSidebar from "@/Components/RightSidebar";
import Toast from "@/Components/Toast";
import React from "react";
import useSound from "use-sound";
import conga from "../Data/conga.wav"

function DashboardLayout({ authe, children, errors, current_menu, selectedId}) {

    const [play] = useSound(conga)
    window.Echo.channel("messages").listen("EventCreated", async (e) => {
        await play()
        Toast.fire({
          icon: "success",
          title: e.messages.title,
          text: e.messages.data,
        });
      });

    return (
        <div className="layout-wrapper">
            
            <Header auth={authe} errors={errors} />
            <RightSidebar current_menu={current_menu}/>
            
            <>
                {children}
                
                <Footer current_menu={current_menu}/>
                
            </>
            <Modal current_menu={current_menu} />
            <ModalEdit selectedId={selectedId} current_menu={current_menu} />
        </div>
    );
}

export default DashboardLayout;
