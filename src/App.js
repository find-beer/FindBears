/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import RootApp from './RootApp';
import PublishDialog from './components/publish_dialog/PublishDialog';
import {View} from 'react-native';

console.disableYellowBox = true;

export default class App extends React.Component {
    render() {
        return <View style={{flex:1}}>
            <RootApp/>
            <PublishDialog ref={ref => global.publishDialog = ref}/>
        </View>;
    }
}
