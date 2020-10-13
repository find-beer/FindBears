import {Dimensions} from 'react-native';

export const screenW = Dimensions.get('window').width;
export const screenH = Dimensions.get('window').height;

export const TabIcon = {
    home: require('../assets/tab/home_unselected.png'),
    homeActive: require('../assets/tab/home_selected.png'),
    shoulder: require('../assets/tab/meet_unselected.png'),
    shoulderActive: require('../assets/tab/meet_selected.png'),
    publish: require('../assets/tab/publish.png'),
    chat: require('../assets/tab/msg_unselected.png'),
    chatActive: require('../assets/tab/msg_selected.png'),
    mine: require('../assets/tab/mine_unselected.png'),
    mineActive: require('../assets/tab/mine_selected.png'),
};

export const PublishIcon = {
    activity: require('../assets/publish/activity-publish.png'),
    trend: require('../assets/publish/user-publish.png'),
};
