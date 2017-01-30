import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class ChatStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  getMessages() {
    if (!this.get('messages')) this.setMessages([])
    return this.get('messages')
  }
  setMessages(json) {
    this.set('messages', json)
  }
}
const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action
  var messages = MessagesStore.getMessages()

  switch (action.type) {
    case ActionTypes.SEND_MESSAGE:
      messages.push(
        action.json,
      )
      MessagesStore.emitChange()
      break

    case ActionTypes.SEND_IMAGE:
      messages.push(
        action.json,
      )
      MessagesStore.emitChange()
      break

    case ActionTypes.GET_MESSAGE:
      MessagesStore.setMessages(action.json)
      MessagesStore.emitChange()
      break
  }

  return true
})

export default MessagesStore
