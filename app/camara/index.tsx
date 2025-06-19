import { View, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { CameraType, CameraView, FlashMode, Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import ThemedButtonC from '@/shared/ThemedButtonC';
import ThemedButtonG from '@/shared/ThemedButtonG';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker'
import { useStoreImagen } from '@/store/storeImage';

const ScreenPrincipal = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState<CameraType>('back');
    const [flash, setFlash] = useState<FlashMode>('off');
    const cameraRef = useRef(null);
    //const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);


    const setImagenes = useStoreImagen(state => state.guardarUrl);

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
                setImagenes(image);
                setImage(null);
            } catch (error) {
                console.log(error);
            }
            router.dismiss();
        }
    }

    const handredflash = () => {
        setFlash(current => current === 'off' ? 'on' : 'off');
    }

    const handredReverse = () => {
        setType(current => current === 'back' ? 'front' : 'back')
    }

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [5, 5],
            quality: 1,
        });
        if (result.canceled) return;
        result.assets.forEach((asset) => {
            //setSelectedImage(asset.uri);
            setImagenes(asset.uri);
        });
        router.dismiss();
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
                        {/* BOTON ATRAS */}
                        <ThemedButtonC
                            onPress={() => router.back()}
                            iconName='arrow-back-sharp'
                            style={{ position: 'absolute', top: 40, left: 32 }}
                        />
                        {/* BOTON PARA FLASH */}
                        <ThemedButtonC
                            onPress={handredflash}
                            iconName='flash-sharp'
                            style={{ position: 'absolute', top: 40, right: 32 }}
                            color={flash === 'off' ? 'cyan' : 'yellow'}
                        />

                    </View>
                    :
                    <Image source={{ uri: image }} style={{ flex: 1 }} />
            }
            <View>
                {
                    image ?
                        <View>
                            {/* BOTON PARA VOLVER A SACAR FOTO */}
                            <ThemedButtonC
                                onPress={() => setImage(null)}
                                iconName='reload-sharp'
                                style={{ position: 'absolute', bottom: 60, left: 32 }}
                            />
                            {/* BOTON PARA GUARDAR */}
                            <ThemedButtonC
                                onPress={saveImage}
                                iconName='save-sharp'
                                style={{ position: 'absolute', bottom: 60, right: 32 }}
                            />
                        </View>
                        :
                        <View>
                            {/* BOTON PARA ABRIR IMAGENES GUARDADAS */}
                            <ThemedButtonC
                                onPress={pickImageAsync}
                                iconName='images-sharp'
                                style={{ position: 'absolute', bottom: 60, left: 32 }}
                            />
                            {/* BOTON PARA TOMAR LA FOTO */}
                            <ThemedButtonG
                                onPress={takePicture}
                            />
                            {/* BOTON PARA VOLTEAR LA CAMARA */}
                            <ThemedButtonC
                                onPress={handredReverse}
                                iconName='repeat-sharp'
                                style={{ position: 'absolute', bottom: 60, right: 32 }}
                                color={type === 'back' ? 'cyan' : 'yellow'}
                            />
                        </View>
                }
            </View>
        </View>
    )
}

export default ScreenPrincipal




