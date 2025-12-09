import React, { useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일
import './HeatMapCalendar.css'; // 커스텀 스타일
//잔디 데이터 타입 
import {Grass} from '../../types/mypage';
// 유틸리티 함수
import { calculateDegree } from '../../utils/grassUtils';
import { formatDateToISO, formatDay, formatDateToKorean } from '../../utils/dateUtils';


interface HeatMapCalendarProps{
    selectedDate: Date;
    onDateChange: (date: Date) => void;
    grassData: Grass[]; //가져온 Grass 타입 사용 
    onMonthChange: (date: Date) => void; //월 변경 감지 
} 

const HeatMapCalendar: React.FC<HeatMapCalendarProps> = ({
    selectedDate,  //선택된 날짜
    onDateChange,  //날짜를 클릭했을 때 실행 함수 
    grassData, 
    onMonthChange,
}) => {
    //잔디 데이터 Map 변환 
    const grassMap = useMemo(() => {
        const map = new Map<string, number>();
        
        grassData.forEach((item) => {
          // 여기서 계산해서 Map에 저장!
          const degree = calculateDegree(item.solvedCount);
          map.set(item.date, degree);
        });
        
        return map;
      }, [grassData]);
    //타일 색상 입히기 
    const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
        if (view !== 'month') return null;
    
        const dateStr = formatDateToISO(date);
        const degree = grassMap.get(dateStr); // Map에는 이미 계산된 degree가 들어있음
    
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