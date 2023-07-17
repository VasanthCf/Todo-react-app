import React from "react";
import { SlCalender } from "react-icons/sl";
import { enGB } from "date-fns/locale";
import { DateRangePicker, START_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import "./datePicker.css";
export default function DatePicker({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  calenderColor
}) {
  return (
    <div className="mainPicker">
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        minimumDate={new Date()}
        minimumLength={1}
        format="dd MMM yyyy"
        locale={enGB}
      >
        {({ startDateInputProps, endDateInputProps, focus }) => (
          <div className="date-range">
            <button
              className={
                "date-range_button" + (focus === START_DATE ? " -focused" : "")
              }
              {...startDateInputProps}
            >
              <SlCalender
                className={
                  calenderColor ? "calender-icon blink" : "calender-icon"
                }
              />
            </button>
          </div>
        )}
      </DateRangePicker>
    </div>
  );
}
