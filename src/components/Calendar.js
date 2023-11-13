import React, { Component, useState, useEffect } from 'react';
import { render } from 'react-dom';
import { useHistory } from "react-router-dom";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import '../index.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { getAllDayPlanAPI } from '../api/DayPlanAPI';
import { result } from 'lodash';

const localizer = momentLocalizer(moment);

const MyCalendar =() =>{

  const history = useHistory();

    const [dayPlan, setDayPlan] = useState([]);

    useEffect(()=>{
      allDayPlans(userId).then(dayplansdetails =>{
        setDayPlan(dayplansdetails);
      })
    },[])

    const now = new Date();
    moment(now).format("dddd, MMMM Do YYYY");
    // console.log('now', now);

    
    const userId = window.localStorage.getItem('userId')
    // console.log('userId', userId);

    
    const allDayPlans = async (userId) => {
      let allDayPlanDetails;
        const result = await getAllDayPlanAPI(userId)
      
          allDayPlanDetails = result.map((dayPlan) => {
            return {
              id: dayPlan._id,
              title: "Day Plan",
              start: new Date(dayPlan.date),
              end: new Date(dayPlan.date)
            }
          })
          console.log('allDayPlan details', allDayPlanDetails);
    
        return allDayPlanDetails;
        // console.log('allDayPlans', allDayPlans);
    }

    const selectEvents = (e) =>{
        console.log('e', e);
        const dayPlanDate = moment(e.start).format("YYYY-MM-D");
        console.log('dayaplandate',dayPlanDate)
        history.push(`./foodDiary/${dayPlanDate}`);

    }
 
    return (
      <div>
        <p style={{ marginTop: '20pt', marginBottom: '20pt', fontSize: 30 }}>
          My Diet Calendar
        </p>
        <div style={{ height: '400pt', width: '500pt', margin: 'auto' }}>
          <Calendar
            events={dayPlan}
            onSelectEvent={selectEvents}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
          />
        </div>
      </div>
    );
}

export default MyCalendar;