import React from "react";
import "./timeCalculation.css";

export default function GetTimeDifference({ todos }) {
  const currentDate = new Date();
  const setOldDate =
    new Date(todos.date).toDateString() === new Date().toDateString()
      ? todos.dateISO
      : todos.date;

  const oldDate = new Date(setOldDate);
  const timeDifference = currentDate.getTime() - oldDate.getTime();
  if (isNaN(timeDifference)) return;
  // Convert milliseconds to days, hours, minutes, and seconds
  const seconds = Math.floor(timeDifference / 1000) % 60;
  const minutes = Math.floor(timeDifference / (1000 * 60)) % 60;
  const hours = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Build the time difference string based on the values
  // if(new Date(todos.startDate).toDateString()< currentDate.toDateString() && new Date(todos.endDate).toDateString()>currentDate.toDateString()){
  //   return <p className="completed-paragraph" style={{ color: "green" }}>Task completed within time</p>;
  // }
  if (seconds < 0 || minutes < 0 || hours < 0 || days < 0) {
    return <p className="completed-paragraph">Task not yet started</p>;
  }
  if (days > 0) {
    return (
      <p className="completed-paragraph">
        Task Completed in{" "}
        <span style={{ color: "red" }}>
          {`${days}d,${hours}h,${minutes}m`}{" "}
        </span>
      </p>
    );
  }
  if (hours > 0) {
    return (
      <p className="completed-paragraph">
        Task Completed in{" "}
        <span style={{ color: "orange" }}>{`${hours}h,${minutes}m`}</span>
      </p>
    );
  }
  if (minutes > 0) {
    return (
      <p className="completed-paragraph">
        Task Completed in{" "}
        <span style={{ color: "green" }}>{`${minutes}m,${seconds}s`}</span>
      </p>
    );
  }

  return (
    <p className="completed-paragraph">
      Task Completed in <span style={{ color: "green" }}>{`${seconds}s`}</span>
    </p>
  );
}
export function formatDate(dateStr) {
  const givenDate = new Date(dateStr);
  const now = new Date();
  const difference = Math.floor((now - givenDate) / (1000 * 60 * 60 * 24)); // Calculate the difference in days

  if (difference < 0) {
    return `${Math.abs(difference)} ${
      Math.abs(difference) === 1 ? "day" : "days"
    } to start`;
  }

  if (difference === 0) {
    return "Today";
  }

  if (difference >= 1) {
    const options = { weekday: "short", day: "numeric", month: "short" };
    const formattedDate = givenDate.toLocaleDateString("en-US", options);
    return formattedDate.replace(",", ""); // Remove the comma from the formatted date
  }
}

// if (difference <= 7) {
//   return `${difference} days ago`;
// }
// if (difference <= 30) {
//   const weeks = Math.floor(difference / 7);
//   return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
// }
// if (difference <= 365) {
//   const months = Math.floor(difference / 30);
//   return `${months} month${months > 1 ? "s" : ""} ago`;
// }

// const years = Math.floor(difference / 365);
// return `${years} year${years > 1 ? "s" : ""} ago`;
