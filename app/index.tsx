import { View, Image, useWindowDimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { CameraType, CameraView, FlashMode, Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import ThemedButtonG from './ThemedButtonG';
import ThemedButtonC from './ThemedButtonC';

const ScreenPrincipal = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState<CameraType>('back');
    const [flash, setFlash] = useState<FlashMode>('off');
    const cameraRef = useRef(null);
    const dimensions = useWindowDimensions();

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestMicrophonePermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted')
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data)
                setImage(data.uri)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const saveImage = async () => {
        if (image) {
            try {
                await MediaLibrary.createAssetAsync(image);
                alert('Picture save');
                setImage(null);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handredflash = () => {
        setFlash(current => current === 'off' ? 'on' : 'off');
    }

    const handredReverse = () => {
        setType(current => current === 'back' ? 'front' : 'back')
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            {
                !image ?
                    <View style={{ flex: 1 }}>
                        <CameraView style={{ flex: 1 }}
                            facing={type}
                            flash={flash}
                            ref={cameraRef}
                        />
                        <ThemedButtonC
                            onPress={() => setImage(null)}
                            iconName='arrow-back-sharp'
                            style={{ position: 'absolute', top: 40, left: 32 }}
                        />
                        <ThemedButtonC
                            onPress={handredflash}
                            iconName='flash-sharp'
                            style={{ position: 'absolute', top: 40, left: dimensions.width / 2 - 20 }}
                            color={flash === 'off' ? 'cyan' : 'yellow'}
                        />
                        <ThemedButtonC
                            onPress={handredReverse}
                            iconName='repeat-sharp'
                            style={{ position: 'absolute', top: 40, right: 32 }}
                            color={type === 'back' ? 'cyan' : 'yellow'}
                        />

                    </View>
                    :
                    <Image source={{ uri: image }} style={{ flex: 1 }} />
            }
            <View>
                {
                    image ?
                        <View>
                            <ThemedButtonC
                                onPress={() => setImage(null)}
                                iconName='reload-sharp'
                                style={{ position: 'absolute', bottom: 60, left: 32 }}
                            />
                            <ThemedButtonC
                                onPress={saveImage}
                                iconName='save-sharp'
                                style={{ position: 'absolute', bottom: 60, right: 32 }}
                            />
                        </View>
                        :
                        <View>
                            <ThemedButtonG
                                onPress={takePicture}
                            />
                            <ThemedButtonC
                                onPress={() => { }}
                                iconName='images-sharp'
                                style={{ position: 'absolute', bottom: 60, left: 32 }}
                            />
                        </View>
                }
            </View>
        </View>
    )
}

export default ScreenPrincipal




