import React from "react";
import { formatDate } from "./timeCalculation";
import { FaRegCalendarPlus } from "react-icons/fa";
import "./starttime.css";
const StartTime = ({ date }) => {
  return (
    <>
      <span className="start-date-span">
        <FaRegCalendarPlus className="start-date-icon" />
        {formatDate(date)}
      </span>
    </>
  );
};
export default StartTime;
