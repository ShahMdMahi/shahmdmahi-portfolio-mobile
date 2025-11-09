import * as Network from "expo-network";
import { useEffect, useState } from "react";

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const checkConnection = async () => {
      const state = await Network.getNetworkStateAsync();
      setIsConnected(state.isConnected ?? true);
    };

    checkConnection();
    const interval = setInterval(checkConnection, 3000);

    return () => clearInterval(interval);
  }, []);

  return {
    isConnected,
    isOffline: !isConnected,
  };
};
