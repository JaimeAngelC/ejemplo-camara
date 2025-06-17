import { View, Text, useWindowDimensions, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

interface Props {
    onPress: ()=> void;
    iconName?: keyof typeof Ionicons.glyphMap;
    style?: string;
}

const ButtonCamara = ({onPress, iconName, style}: Props) => {
    const dimensions = useWindowDimensions();
  return (
    <TouchableOpacity
            onPress={onPress}
            style={[
                styles.shutterButton,
                {
                    position: 'absolute',
                    bottom: 35,
                    left: dimensions.width / 2 - 32,
                    borderColor: 'cyan',
                },
            ]}
        ></TouchableOpacity>
  )
}

export default ButtonCamara

const styles = StyleSheet.create({
    

    shutterButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'white',
        // borderColor: 'red',
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },

    
});