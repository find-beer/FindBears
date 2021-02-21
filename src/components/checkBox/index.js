/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-02-21 18:41:34
 * @LastEditTime : 2021-02-21 21:47:39
 * @FilePath     : /src/components/checkBox/index.js
 */
import React from 'react';
import {
  View, 
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default class CheckBox extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      options: props.options,
      currentSelect: null,
      currentSelectedTarget: null
    }
  }

  componentDidMount() {
    const { options } = this.props
    const defaultSelectValue = options[0].value 
    this.setState({
      currentSelect: defaultSelectValue
    })
  }

  onSelect = (item) => {
    const { value } = item
    this.setState({
      currentSelect: value,
      currentSelectedTarget: item
    })
    this.props.onChange && this.props.onChange(item)
  }

  render() {
    const { currentSelect, options } = this.state
    return (
      <View style={styles.checkboxContainer}>
        {
          options.map((item, index) => {
            return (
              <TouchableOpacity activeOpacity={0.75} key={index} style={styles.checkboxItem} onPress={() => this.onSelect(item)}>
                <View style={styles.checkbox}>
                  {
                    currentSelect === item.value ? <View style={styles.checkboxInside}></View> : null
                  }
                </View>
                <Text style={styles.checkboxLabel}>{item.label}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  checkboxItem: {
    flexDirection: 'row',
    marginLeft: 10,
  },

  checkboxLabel: {
    marginLeft: 10,
  },
  checkbox: {
    width: 15,
    height: 15,
    marginLeft: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(169,169,169,0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },

  checkboxInside: {
    width: 8,
    height: 8,
    backgroundColor: '#8A8DF9',
    borderRadius: 15,
  }
})