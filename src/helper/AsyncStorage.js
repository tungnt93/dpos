import { AsyncStorage } from 'react-native';

export const setItem = async(key, value, type) => {
    if(type === 'JSON'){
        await AsyncStorage.setItem(key, JSON.stringify(value));
    }
    else{
        await AsyncStorage.setItem(key, value);
    }
};

export const getItem = async(key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if(value !== null){
            return value;
        }
        return '';
    }
    catch (error){
        return '';
    }
};

export const removeItem = async(key) => {
    await AsyncStorage.removeItem(key);
};