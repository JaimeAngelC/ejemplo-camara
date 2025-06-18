import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const index = () => {
  return (
    <View className='flex-1 justify-center mx-5'>
      <View>
        <Text className='text-6xl'>HOME</Text>
      </View>      
      <Pressable className='bg-slate-700 p-4 rounded-lg items-center' onPress={()=> router.push('/camara')}>
        <Text className='color-white'>CAMARA</Text>
      </Pressable>
      <View className='p-3'/>
      <Pressable className='bg-slate-500 p-4 rounded-lg items-center' onPress={()=> router.push('/galeria')}>
        <Text className='color-white'>IMAGENES</Text>
      </Pressable>
    </View>
  )
}

export default index