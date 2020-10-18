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
import SelectItemsDialog from "./components/select_dialog/SelectItemsDialog";

console.disableYellowBox = true;

export default class App extends React.Component {
    render() {
        return <View style={{flex:1}}>
            <RootApp/>
            <PublishDialog ref={ref => global.publishDialog = ref}/>
            <SelectItemsDialog
                itemKey='value'
                ref={ref => global.selectItemsDialog = ref}
                onPress={(which) => {
                }}/>
        </View>;
    }
}
