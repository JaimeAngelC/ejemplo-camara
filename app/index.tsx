import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { useStoreImagen } from '@/store/storeImage';

const index = () => {
  const imagenes = useStoreImagen(state => state.url);
  const imageDefauld = require('../assets/user.png');

  const getImageSource = () => {
    if (imagenes && imagenes !== '') {
      return { uri: imagenes };
    }
    return imageDefauld;
  };

  return (
    <View className='flex-1 justify-center mx-5'>
      <View className='items-center'>
        <Text className='text-6xl'>HOME</Text>

        <Image source={getImageSource()} className='bg-slate-900 w-[150px] h-[150px] rounded-[75px] border-[3px]' />
      </View>
      <View className='p-5' />
      <Pressable className='bg-slate-700 p-4 rounded-lg items-center' onPress={() => router.push('/camara')}>
        <Text className='color-white'>CAMARA</Text>
      </Pressable>
      <View className='p-3' />
      <Pressable className='bg-slate-500 p-4 rounded-lg items-center' onPress={() => router.push('/galeria')}>
        <Text className='color-white'>IMAGENES</Text>
      </Pressable>
    </View>
  )
}

export default index