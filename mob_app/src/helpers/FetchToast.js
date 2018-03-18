import { Alert } from 'react-native';

const FetchToast = (title, msg, retry = () => {}, cancel = () => {}) => {
    Alert.alert(
        title,
        msg,
        [
          {text: 'Cancel', onPress: () => { cancel() }, style: 'cancel'},
          {text: 'Retry', onPress: () => { retry() } },
        ],
        { cancelable: false }
    );
}

export default FetchToast;