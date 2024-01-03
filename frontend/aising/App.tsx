import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import axios from 'axios';

const App = () => {
    const [convertedVoice, setConvertedVoice] = useState(null);

    const handleVoiceConversion = async () => {
        const payload = {
            model_name: 'your_model_name',
            audio_array: [/* 음성 데이터 배열 */],
            sampling_rate: 16000,
            f0_up_key: 0,
        };

        try {
            const response = await axios.post('http://localhost:3000/api/convert_voice', payload);
            setConvertedVoice(response.data.converted_audio);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <Button title="Convert Voice" onPress={handleVoiceConversion} />
            {convertedVoice && <Text>Converted Voice: {JSON.stringify(convertedVoice)}</Text>}
        </View>
    );
};

export default App;