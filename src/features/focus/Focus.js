import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import {fontSizes, paddingSizes, marginSizes} from '../../utils/sizes';
import {colors} from '../../utils/colors';

export const Focus = ({ addSubject }) => {
  const [tempSubject, setTempSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to Focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: marginSizes.md }}
            onSubmitEditing={
              ({ nativeEvent }) => {
              setTempSubject(nativeEvent.text);
            }}
          />
          <RoundedButton size={50} title="+"
            onPress={() => {
              addSubject(tempSubject);
            }}
          />
        </View>
      </View>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: paddingSizes.md,
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.xl,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingTop: paddingSizes.md,
    alignItems: 'center',
  },
});
