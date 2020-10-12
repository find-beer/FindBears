import AsyncStorage from '@react-native-community/async-storage';


const _KV_PAIRS_ = {
    'session': null,
};


function setByKeyValue(key, value) {
    _KV_PAIRS_[key] = value;
    asyncSet(key, value);
}

function getSessionId() {
    return _KV_PAIRS_['session'];
}

function setSessionId(sessionId) {
    setByKeyValue('session', sessionId);
}

function asyncGet(key, cb) {
    AsyncStorage.getItem(key, (err, result) => {
        if (result) {
            try {
                cb(null, JSON.parse(result));
            } catch (e) {
                cb(e, null);
            }
        } else {
            cb(null, null);
        }
    });
}

function asyncSet(key, value, cb) {
    AsyncStorage.setItem(key, '' + value, cb);
}


export default {
    getSessionId,
    setSessionId,
};
