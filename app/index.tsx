import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {CameraType, CameraView, FlashMode, Camera} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import FAB from './FAB';
import ButtonCamara from './ButtonCamara';
import { Ionicons } from '@expo/vector-icons';

const ScreenPrincipal = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState<CameraType>('back');
    const [flash, setFlash] = useState<FlashMode>('off');
    const cameraRef =useRef(null);

    useEffect(() => {
      (async()=> {
        MediaLibrary.requestPermissionsAsync();
        const cameraStatus = await Camera.requestMicrophonePermissionsAsync();
        setHasCameraPermission(cameraStatus.status==='granted')
      })();
    }, []);

    const takePicture = async () => {
        if(cameraRef){
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data)
                setImage(data.uri)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            {
                !image?
                <CameraView style={{flex: 1}}
                    facing= {type}
                    flash={flash}
                    ref={cameraRef}
                />
            :
                <Image source={{uri: image}} style={{flex: 1}}/>
            }
                <View>
            {
                image? 
                    <View style={{paddingHorizontal:50}}>
                        
                        <TouchableOpacity onPress={()=> {}} style={styles.galleryButton}>
                            <Ionicons name="images-outline" size={30} color="cyan" />
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={()=> {}} style={styles.returnCancelButton}>
                            <Ionicons name="arrow-back-outline" size={30} color="white" />
                        </TouchableOpacity>
                    </View>                    
            :                
            <ButtonCamara onPress={takePicture}/>     
                
            }
            </View>
        </View>
    )
}

export default ScreenPrincipal

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },

    galleryButton: {
        width: 50,
        height: 50,
        borderRadius: 32,
        backgroundColor: '#17202A',
        position: 'absolute',
        bottom: 40,
        left: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },

    returnCancelButton: {
        width: 50,
        height: 50,
        borderRadius: 32,
        backgroundColor: '#17202A',
        position: 'absolute',
        top: 40,
        right: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
  });