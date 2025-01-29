import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal, Slide } from '@mui/material';
import PageHeading from '../../../components/pageHeding/PageHeading';
import Cards from './subComponents/Cards';
import Tabs from './subComponents/Tabs';
import Table from './subComponents/Table';
import CreatedCalendar from '../../../components/calender/CreatedCalender';
import dayjs from 'dayjs';
import { useGetVendorRevenue } from '../../../api/useDataController';
import { getFirstDayOfMonth, getLastDayOfMonth } from './startEndDateDefault';

const Revenue = () => {
    const location = useLocation();
    const [page, setPage] = useState(1);
    const [selectedTab, setSelectedTab] = useState(location?.state?.selectedTab || 'Pending');
    const [startDate, setStartDate] = useState(getFirstDayOfMonth(new Date()));
    const [endDate, setEndDate] = useState(getLastDayOfMonth(new Date()));
    const [calendarVisible, setCalendarVisible] = useState(false);
    const dateRangeRef = useRef(null);
    const [modalStyle, setModalStyle] = useState({});

    // useEffect(() => {
    //     if (location.state?.selectedTab) {
    //         setSelectedTab(location.state.selectedTab);
    //     }
    // }, [location.state]);
    const { data,isLoading,error } = useGetVendorRevenue(page, selectedTab, startDate, endDate);
    console.log(data);
    console.log(error);
    
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const updateCalendarPosition = () => {
        if (dateRangeRef.current) {
            const rect = dateRangeRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const calendarHeight = 400; // Approximate height of calendar
            
            let top = rect.bottom + 8; // 8px gap
            
            // Check if calendar would extend beyond viewport
            // if (top + calendarHeight > viewportHeight) {
            //     top = rect.top - calendarHeight - 8; // Position above if not enough space below
            // }

            let left = rect.left;
            const calendarWidth = 325;
            
            // Ensure calendar doesn't extend beyond right edge
            if (left + calendarWidth > window.innerWidth) {
                left = window.innerWidth - calendarWidth - 16;
            }

            setModalStyle({
                position: 'fixed',
                top: `${top}px`,
                left: `${left}px`,
                transform: 'none',
                maxHeight: `${calendarHeight}px`,
                zIndex: 1300
            });
        }
    };

    const toggleCalendar = () => {
        if (!calendarVisible) {
            updateCalendarPosition();
        }
        setCalendarVisible(!calendarVisible);
    };

    useEffect(() => {
        if (calendarVisible) {
            window.addEventListener('resize', updateCalendarPosition);
            return () => {
                window.removeEventListener('resize', updateCalendarPosition);
            };
        }
    }, [calendarVisible]);

    const formatDateRange = () => {
        if (!endDate || startDate.getTime() === endDate.getTime()) {
            return dayjs(startDate).format('DD MMM YYYY');
        }
        return `${dayjs(startDate).format('DD MMM YYYY')} - ${dayjs(endDate).format('DD MMM YYYY')}`;
    };

    const handleDateChange = (start, end) => {
        setStartDate(start);
        setEndDate(end);
    };

    return (
      <div className="font-urbanist">
        <PageHeading title="Revenue" />
        <Cards dataFrom={data} />
        <h1 className="font-[500] text-[24px] font-urbanist mt-5">Payouts</h1>

        <div className="flex justify-between items-center mt-5">
          <Tabs
            tabs={["Pending", "Completed"]}
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />
          <div
            ref={dateRangeRef}
            onClick={toggleCalendar}
            className="flex items-center bg-white px-4 py-2 rounded-md shadow-sm cursor-pointer"
          >
            <span className="text-[16px] font-medium">{formatDateRange()}</span>
            <svg
              className="ml-2"
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 6.062L0 1.062L1.062 0L5 3.938L8.938 0L10 1.062L5 6.062Z"
                fill="#293050"
              />
            </svg>
          </div>
        </div>

        <Modal
          open={calendarVisible}
          onClose={toggleCalendar}
          BackdropProps={{
            onClick: toggleCalendar,
          }}
          sx={{
            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
          keepMounted
        >
          <Slide direction="up" in={calendarVisible} timeout={300}>
            <div
              className="bg-white rounded-lg shadow-lg"
              style={modalStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <CreatedCalendar
                setStartDate={(date) => handleDateChange(date, endDate)}
                setEndDate={(date) => handleDateChange(startDate, date)}
              />
            </div>
          </Slide>
        </Modal>

        <Table
                selectedTab={selectedTab}
                loading={isLoading}
          page={page}
          setPage={setPage}
          data={data?.orders}
        />
      </div>
    );
};

export default Revenue;

