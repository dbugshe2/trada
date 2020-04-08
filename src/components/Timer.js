import React, { useState, useEffect } from "react";
import Text from './primary/Text'

const Timer = props => {
  const { time, onComplete } = props
  const [timer, setTimer] = useState(time)
  useEffect(() => {
    // if (time) {
      if (timer.mins < 0) {
        if (timerId) {
          clearInterval(timerId);
        }
        return;
      }
      const timerId = setInterval(() => {
        if (timer.secs <= 0) {
          if (timer.mins <= 0) {
            setTimer({ ...timer, mins: timer.mins - 1, secs: timer.secs });
            onComplete()
          } else {
            setTimer({ ...timer, mins: timer.mins - 1, secs: 59 });
          }
        } else setTimer({ ...timer, mins: timer.mins, secs: timer.secs - 1 });
      }, 1000);
      return () => clearInterval(timerId);
    // }
  }, [timer]);

  if (!time) return (
    <Text>Set Timer</Text>
  )
    
  return (
      <Text {...props} >
        {timer.mins >= 0 ? timer.mins : 0}:{timer.secs < 10 && 0}
        {timer.secs}
      </Text>
  );
};

export default Timer;
