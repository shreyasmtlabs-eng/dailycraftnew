import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useDispatch } from 'react-redux';
import { setInternetStatus } from '../redux/slice/internetslice';

const InternetListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected =
        state.isConnected === true &&
        state.isInternetReachable !== false;

      dispatch(setInternetStatus(connected));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; // no UI
};

export default InternetListener;
