import { Alert } from 'react-native';

const FetchToast = (title, msg, cancel, retry) => {
    Alert.alert(
        title,
        msg,
        [
          {text: 'Cancel', onPress: () => { /*cancel()*/ }, style: 'cancel'},
          {text: 'Retry', onPress: () => { /*retry()*/ } },
        ],
        { cancelable: false }
    );
}

export default FetchToast;