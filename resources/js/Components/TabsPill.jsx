import React from "react";

function TabsPill({ item }) {

    console.log(item)
    return (
        <ul class="nav nav-pills">
            {Object.keys(item).map((index) => {
             return <li class="nav-item">
                    <a class={`nav-link ${item[index].active ? 'active' : ""}`} href={item[index].url}>
                        {item[index].name}
                    </a>
                </li>;
            })}
        </ul>
    );
}

export default TabsPill;
