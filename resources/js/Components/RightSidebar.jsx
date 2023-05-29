import React from "react";
import SidebarItem from "./Sidebar/SidebarItem";

function RightSidebar({current_menu}) {
        
   
    return (
        <div className="vertical-menu">
            <div data-simplebar className="h-100">
                <div id="sidebar-menu">
                    <SidebarItem current_menu={current_menu}/>
                </div>
            </div>
        </div>
    );
}

export default RightSidebar;
