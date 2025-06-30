  import { AudioModule } from 'expo-audio';
import { useEffect, useState } from 'react';
  
  const useAudioSetup = () => {
    const [isConfigured, setIsConfigured] = useState(false);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => {
        configureAudioSession();
    })

    const configureAudioSession = async () => {
    try {

      await AudioModule.setAudioModeAsync({
        allowsRecording: false,
        shouldPlayInBackground: true,
        interruptionMode: 'doNotMix',
        playsInSilentMode: true, // This is the key setting for silent mode
        interruptionModeAndroid: 'doNotMix',
      });

      setIsConfigured(true);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown audio configuration error');
      setError(err)
    }
  };


    return { isConfigured, error }
  }
  
  export default useAudioSetup