import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router';
import { useStoreImagen } from '@/store/storeImage';

const index = () => {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const imagenes = useStoreImagen(state => state.url);
    const setImagenes = useStoreImagen(state => state.guardarUrl);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [5, 6],
            quality: 1,
        });

        if (result.canceled) return;

        result.assets.forEach((asset) => {
            setSelectedImage(asset.uri);

            console.log(selectedImage);
        });

        router.dismiss();

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