import React from "react";
import listView from '../../assests/images/list-view-icon.svg';
import boardView from '../../assests/images/board-view-icon.svg';


const Dashboard = () => {


    return (
        <div className="dashboard">
            <div className="dashboard-view">
                <button className={`view-btn active`}>
                    <img src={listView} width={16} height={16} alt="List_View_Icon" />
                    List
                </button>
                <button className={`view-btn`}>
                    <img src={boardView} width={16} height={16} alt="Board_View_Icon" />
                    Board
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
