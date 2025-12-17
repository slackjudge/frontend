import React, { useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './HeatMapCalendar.css'; 
import {Grass} from '../../types/mypage';
import { calculateDegree } from '../../utils/grassUtils';
import { formatDateToISO, formatDay, formatDateToKorean } from '../../utils/dateUtils';

/*
author : 최하영
*/
interface HeatMapCalendarProps{
    selectedDate: Date;
    onDateChange: (date: Date) => void;
    grassData: Grass[]; 
    onMonthChange: (date: Date) => void; 
} 

const HeatMapCalendar: React.FC<HeatMapCalendarProps> = ({
    selectedDate,  
    onDateChange,  
    grassData, 
    onMonthChange,
}) => {
    const grassMap = useMemo(() => {
        const map = new Map<string, number>();
        
        grassData.forEach((item) => {
          const degree = calculateDegree(item.solvedCount);
          map.set(item.date, degree);
        });
        
        return map;
      }, [grassData]);
    const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
        if (view !== 'month') return null;
    
        const dateStr = formatDateToISO(date);
        const degree = grassMap.get(dateStr);
    
        if (degree !== undefined) {
          return `grass-degree-${degree}`;
        }
        return 'grass-degree-0';
    };
    return (
        <div className="heatmap-calendar-container">
          <Calendar
            locale="en-US"
            calendarType="gregory"
            selectRange={false}
            value={selectedDate}
            
            onChange={(value) => {
              if (value instanceof Date) {
                onDateChange(value);
              } else if (Array.isArray(value) && value[0] instanceof Date) {
                onDateChange(value[0]);
              }
            }}
            
            onActiveStartDateChange={({ activeStartDate }) => {
              if (activeStartDate) onMonthChange(activeStartDate);
            }}
            
            tileClassName={getTileClassName}
            formatDay={(_locale, date) => formatDay(date)}
            next2Label={null}
            prev2Label={null}
            formatMonthYear={(_locale, date) => formatDateToKorean(date)}
          />
        </div>
      );
    };
    
    export default HeatMapCalendar;