/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-23 15:13:17
 * @LastEditTime : 2021-02-21 13:56:58
 * @FilePath     : /src/components/modalLoading/index.js
 */
import React, { Component } from 'react'
import {
  Modal,
} from 'react-native'
import Loading from './../loading'
import { bindActions, bindState, connect } from './../../redux'

class ModalLoading extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { modalLoadingState } = nextProps
    return {
      visible: modalLoadingState.show,
      title: modalLoadingState.title
    }
  }

  render() {
    const { visible, title } = this.state
    return (
      <Modal transparent visible={!!visible}>
       <Loading title={title}/>
      </Modal>
    )
  }
}

export default connect(bindState, bindActions)(ModalLoading)