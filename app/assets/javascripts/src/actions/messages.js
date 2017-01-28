import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID,
      userID: newUserID,
    })
  },

  sendMessage(userID, message) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.SEND_MESSAGE}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({
        to_user_id: userID,
        text: message,
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SEND_MESSAGE,
            userID: userID,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
    // Dispatcher.handleViewAction({
    //   type: ActionTypes.SEND_MESSAGE,
    //   userID: userID,
    //   message: message,
    //   timestamp: +new Date(),
    // })
  },
}
