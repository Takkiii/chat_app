import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {

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
  },
  sendImage(userID, file) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.SEND_IMAGE}`)
      .set('X-CSRF-Token', CSRFToken())
      .field('to_user_id', userID)
      .attach('image', file, file.name)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SEND_IMAGE,
            userID: userID,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
  getMessages(userID) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.GET_MESSAGE}`)
      .query({
        from_user_id: userID,
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_MESSAGE,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
}
