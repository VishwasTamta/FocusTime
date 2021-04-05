import React,{useState, useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {fontSizes, paddingSizes} from '../utils/sizes'
import {colors} from '../utils/colors'

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => time < 10 ? `0${time}` : time;

export const Countdown = ({
  minutes= 1,
  isPaused,
  onProgress,
  onEnd,
}) => {
  const interval = React.useRef(null);
  const countDown = () => {
    setMillis((time) =>{
      if(time === 0){
        clearInterval(interval.current);
        return time;
      }
        const timeLeft = time - 1000;
        return timeLeft;
    })
  }

  useEffect(()=>{
     onProgress(millis / minutesToMillis(minutes));
     if(millis === 0){
        onEnd();
     }
  },[millis])

  useEffect(() =>{
    if(isPaused)
    {
      if(interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);
    return  ()=> clearInterval(interval.current);
  }, [isPaused])
  const [millis, setMillis] = useState(null);
  const min = Math.floor(millis/1000/60) % 60;
  const sec = Math.floor(millis/1000) % 60;


  useEffect(() =>{
    setMillis(minutesToMillis(minutes));
  }, [minutes])

  return (
    <Text style={styles.text}>{formatTime(min)}:{formatTime(sec)}</Text>
    );
};

const styles = StyleSheet.create({
  text:{
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
    padding: paddingSizes.lg,
    backgroundColor: 'rgba(92,132,226,0.3)'
  }
})
