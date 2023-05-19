import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TimeContext = createContext();

export function useTimeContext() {
    return useContext(TimeContext);
  }

export function ClockTime() {  
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [loginDate, setLoginDate] = useState(Date.now());

    const getTime = () => {
      const time = Date.now() - loginDate;      
  
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    };
  
    useEffect(() => {
      setLoginDate(Date.now());
      const interval = setInterval(() => getTime(loginDate), 1000);
  
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        //console.log("From Clock M:"+minutes+" From Clock S:"+seconds);
        
        localStorage.setItem('clockMinutes',minutes);
        localStorage.setItem('clockSeconds',seconds);
    },[minutes, seconds]);

    // return <div>{minutes + ":" + seconds}</div>
}