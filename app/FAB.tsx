import { Pressable, StyleProp, ViewStyle, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';


interface Props {
    iconName: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    fill?: boolean;
    color?: string;
}

const FAB = ({ onPress, style, iconName, fill = true, color }: Props) => {

    return (
        <Pressable style={[style, fill ? { backgroundColor: 'cyan' } : { }, styles.boton]}
            onPress={onPress}
        >
            <Ionicons name={iconName} color={color ? color : 'black'} size={25} />
        </Pressable>       
    )
}

export default FAB;

const styles = StyleSheet.create ({
    boton: {
        zIndex: 0,
        height: 40,
        width: 40,
        justifyContent:'center',
        alignItems: 'center',
        borderCurve: 'circular'
    }

})