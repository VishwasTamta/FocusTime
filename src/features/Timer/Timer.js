import React,{useState} from 'react';
import { View, StyleSheet, Text, Platform, Vibration } from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {useKeepAwake} from 'expo-keep-awake';

import { paddingSizes } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import {Countdown} from '../../components/Countdown';
import {RoundedButton} from '../../components/RoundedButton';
import {Timming} from './Timming';

const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const onProgress = (progress) =>{
    setProgress(progress);
  }

  const changeTime = (min) =>{
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  }

  const vibrate = () =>{
    if(Platform === 'ios'){
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    }else{
      Vibration.vibrate(10000);
    }
  }

  const onEnd = () =>{
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }
  return ( 
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown minutes={minutes} isPaused={!isStarted} onProgress={onProgress} onEnd={onEnd}/>
      </View>
      <View style={{paddingTop: paddingSizes.md}}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
        <View style={{paddingTop: paddingSizes.sm}}>
          <ProgressBar 
            progress={progress}
            color='#5e84e2' 
            style={{height:10}} 
          />
          <View style={styles.buttonWrapper}> 
            <Timming onChangeTime={changeTime}/>
          </View>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? ( 
          <RoundedButton title={'Pause'} onPress={() => setIsStarted(false)} />
        ): (
          <RoundedButton title={'Start'} onPress={() => setIsStarted(true)} />
          )
        }
      </View>
       <View style={styles.clearSubject}>
        <RoundedButton 
        title={'-'} 
        size={50}
        onPress={() => clearSubject() }
         />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? paddingSizes.xxl : paddingSizes.lg,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countdown:{
    flex:1,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonWrapper:{
    flex: 1,
    flexDirection: "row",
    padding: paddingSizes.md,
    paddingTop: paddingSizes.xxxl,
    alignItems: "center",
    justifyContent: "center",
  },
  clearSubject:{
    paddingBottom: 25,
    paddingLeft: 25
  }
});
