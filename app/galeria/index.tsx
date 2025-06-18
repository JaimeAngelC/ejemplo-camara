import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker'

const index = () => {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });
        if(!result.canceled){
            setSelectedImage(result.assets[0].uri);
            console.log(result);
        } else {
            alert("No seleccionaste una imagen.")
        }
    }
  return (
    <View className='flex-1 justify-center px-6'>
      <TouchableOpacity
            onPress={pickImageAsync}            
            className='p-6 items-center justify-center rounded-xl bg-[#16365c]'
        >
            <Text className='text-white'>Seleccionar</Text>
        </TouchableOpacity>
    </View>
  )
}

export default index