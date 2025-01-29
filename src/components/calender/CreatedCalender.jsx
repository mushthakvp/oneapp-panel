import React, { useEffect, useState } from "react";
import "./createdCalender.css";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function CreatedCalendar({ setStartDate, setEndDate }) {
    const [dateRange, setDateRange] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());

    // Check if date is in range or is the start or end date
    const isDateInRange = (currentDate) => {
        if (dateRange.length < 2) return false;
        const [startDate, endDate] = dateRange;
        return startDate <= currentDate && currentDate <= endDate;
    };
    const subtractDaysFromDate = (date, days) => {
        const resultDate = new Date(date);
        resultDate.setDate(resultDate.getDate() + days);
        return resultDate;
    };
    useEffect(() => {

        if (dateRange?.length > 0) {
            if (dateRange?.length === 1) {
                const startDate = subtractDaysFromDate(dateRange[0], 1);
                setStartDate(startDate);
                setEndDate(startDate);
            } else if (dateRange[1]) {
                const startDate = subtractDaysFromDate(dateRange[0], 1);
                const endDate = subtractDaysFromDate(dateRange[1], 1);
                setStartDate(startDate);
                setEndDate(endDate);
            }
        }
    }, [dateRange]);

    const isStartDate = (currentDate) => {
        return (
            dateRange.length > 0 &&
            dateRange[0].toISOString().split("T")[0] ===
            currentDate.toISOString().split("T")[0]
        );
    };

    const isEndDate = (currentDate) => {
        return (
            dateRange.length === 2 &&
            dateRange[1].toISOString().split("T")[0] ===
            currentDate.toISOString().split("T")[0]
        );
    };

    // Handle date click
    const handleDateClick = (event) => {
        const clickedDate = new Date(event.target.getAttribute("data-date"));

        if (dateRange.length === 0 || dateRange.length === 2) {
            setDateRange([clickedDate]);
        } else {
            const [startDate] = dateRange;
            if (clickedDate > startDate) {
                setDateRange([startDate, clickedDate]);
            } else {
                setDateRange([clickedDate, startDate]);
            }
        }
    };

    // Handle previous and next month click
    const handlePrevNextClick = (direction) => {
        let newMonth = direction === "prev" ? month - 1 : month + 1;
        let newYear = year;

        if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }

        setMonth(newMonth);
        setYear(newYear);
    };

    function renderCalendarDates() {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
    
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const daysInMonth = [...Array(lastDate).keys()];
    
        const daysBefore = firstDay;
        const previousMonth = month === 0 ? 11 : month - 1;
        const previousYear = month === 0 ? year - 1 : year;
        const lastDatePreviousMonth = new Date(previousYear, previousMonth + 1, 0).getDate();
    
        const previousMonthDays = [...Array(daysBefore).keys()].map((day) => ({
            day: lastDatePreviousMonth - daysBefore + day + 1,
            month: previousMonth,
            year: previousYear,
            isPreviousMonth: true,
        }));
    
        const currentMonthDays = daysInMonth.map((day) => ({
            day: day + 1,
            month: month,
            year: year,
            isPreviousMonth: false,
        }));
    
        const totalDays = [...previousMonthDays, ...currentMonthDays];
        const daysAfter = 42 - totalDays.length;
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextYear = month === 11 ? year + 1 : year;
    
        const nextMonthDays = [...Array(daysAfter).keys()].map((day) => ({
            day: day + 1,
            month: nextMonth,
            year: nextYear,
            isPreviousMonth: true,
        }));
    
        const allDays = [...totalDays, ...nextMonthDays];
    
        return allDays.map((dateInfo, index) => {
            const { day, month: dayMonth, year: dayYear, isPreviousMonth } = dateInfo;
            const date = new Date(dayYear, dayMonth, day);
            const isToday =
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
                ? "active1"
                : "";
    
            const isSelected = isDateInRange(date);
            const isStart = isStartDate(date);
            const isEnd = isEndDate(date);
            const isCurrentMonth = dayMonth === month && dayYear === year;
    
            let backgroundColor = "";
            let textColor = isCurrentMonth ? "black" : "#8c8c8c"; // Set white color for current month dates
            let borderRadius = "";
            let margin = "";
    
            if (isStart && dateRange.length === 1) {
                backgroundColor = "#2f4eff0f";
                borderRadius = "50%"; // Set to 50% for circular shape when only start date is selected
                textColor = "black";
            } else if (isStart) {
                backgroundColor = "#2f4eff0f";
                borderRadius = "15px 0 0 15px"; // Left border-radius for start date
                textColor = "#ffffff"; // White text for start date
            } else if (isEnd) {
                backgroundColor = "#2f4eff0f";
                borderRadius = "0 15px 15px 0"; // Right border-radius for end date
                textColor = "#ffffff"; // White text for end date
            } else if (isSelected) {
                backgroundColor = "#F8C8C84D"; // Color for selected date range
                borderRadius = "0"; // No border-radius for dates between start and end
            } else if (!isCurrentMonth && isPreviousMonth) {
                backgroundColor = "#2e2d2d04";
                textColor = "#8c8c8c";
            } else if (!isCurrentMonth && !isPreviousMonth) {
                backgroundColor = "#2e2d2d04";
            }
    
            return (
                <li
                    key={index}
                    className={`calendar-date ${isToday} ${isSelected ? "selected" : ""} ${isStart ? "start-date" : ""} ${isEnd ? "end-date" : ""}`}
                    style={{ backgroundColor, color: textColor, borderRadius, margin }}
                    data-date={date.toISOString().split("T")[0]}
                    onClick={handleDateClick}
                >
                    {day}
                </li>
            );
        });
    }
    


    return (
        <div className="calendar-container text-xs font-urbanist">
            <header className="calendar-header">
                <p className="calendar-current-date">
                    {`${months[month]} ${year}`}
                </p>
                <div className="calendar-navigation">
                    <span
                        id="calendar-prev"
                        className="material-icons-round"
                        onClick={() => handlePrevNextClick("prev")}
                    >
                        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 10L0 5L5 0L6.062 1.062L2.125 5L6.062 8.938L5 10Z" fill="#293050" />
                        </svg>
                    </span>
                    <span
                        id="calendar-next"
                        className="material-icons-round"
                        onClick={() => handlePrevNextClick("next")}
                    >
                        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.00048 10L0.938477 8.938L4.87548 5L0.938477 1.062L2.00048 0L7.00048 5L2.00048 10Z" fill="#293050" />
                        </svg>
                    </span>
                </div>
            </header>

            <div className="calendar-body">
                <ul className="calendar-weekdays">
                    <li>Sun</li> 
                    <li>Mon</li>
                    <li>Tue</li>
                    <li>Wed</li>
                    <li>Thu</li>
                    <li>Fri</li>
                    <li>Sat</li>
                </ul>
                <ul className="calendar-dates">{renderCalendarDates()}</ul>
            </div>
        </div>
    );
}

export default CreatedCalendar;