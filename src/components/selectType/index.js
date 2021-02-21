/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-23 21:28:43
 * @LastEditTime : 2021-02-21 21:29:39
 * @FilePath     : /src/components/selectType/index.js
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { bindActions, bindState, connect } from './../../redux'

class SelectType extends Component {
  constructor(props) {
    super(props)
    this.state = {
      labels: [
        { title: '户外', list: [ '爬山党', '露营', '自驾游','周边游','骑行','野外徒步'] },
        { title: '探店', list: [ '攀岩','桌游','健身','轰趴','蹦迪','网红地打卡'] },
        { title: '运动', list: [ '足球','篮球','乒乓球','网球','游泳','滑板','滑雪','台球','羽毛球','跑步'] },
        { title: '兴趣', list: [ '读书','漫展','cosplay','汉服','摄影','k歌'] },
      ],
      selectedLabel: []
    }
  }

  onSelectLabel = (label) => {
    let { selectedLabel } = this.state
    if (selectedLabel.includes(label)) {
      selectedLabel = selectedLabel.filter(item => item !== label)
    } else {
      selectedLabel.push(label)
    }
    this.setState({
      selectedLabel: [...selectedLabel]
    })
    this.props.onChange && this.props.onChange(selectedLabel)
  }

  renderLabel = (list) => {
    const { selectedLabel } = this.state
    return list.map((item) => {
      const selected = selectedLabel.includes(item)
      return (
        <TouchableOpacity key={item} activeOpacity={0.75} style={[styles.itemContainer, selected ? styles.selectedContainer : null ]} onPress={() => this.onSelectLabel(item)}>
          <Text style={[styles.labels, selected ? styles.selectedLabels : null]}>{item}</Text>
        </TouchableOpacity>
      )
    })
  }

  render() {
    const { labels } = this.state
    return (
      <View style={styles.container}>
        <ScrollView style={styles.topContainer}>
          { labels.map((item, index) => {
            return (
              <View key={index}>
                <Text style={styles.labelTitle}>{item.title}</Text>
                <View style={styles.labelContainer}>{ this.renderLabel(item.list)}</View>
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
  },
  labelTitle: {
    marginLeft: 30,
    height: 30,
    marginTop: 10,
    color: '#888889',
    fontWeight: '500'
  },
  labelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemContainer: {
    height: 30,
    width: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 40,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: 'rgba(2,41,93,0.18)',
    shadowOpacity: 0.5,
  },
  selectedContainer: {
    backgroundColor: '#AC9BF7',
    shadowOffset: { width: 0, height: 5 },
    shadowColor: 'rrgba(0,0,0,0.41)',
    shadowOpacity: 0.5,
  },
  selectedLabels: {
    color: '#fff'
  }
})

export default connect(bindState, bindActions)(SelectType)