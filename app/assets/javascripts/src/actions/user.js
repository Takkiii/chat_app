import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  searchUsers(search_query) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.SEARCH_USERS}`)
      .query({
        search_query,
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SEARCH_USERS,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
  createFriendships(userID) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.CREATE_FRIENDSHIPS}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({
        to_user_id: userID,
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
        } else {
          reject(res)
        }
      })
    })
  },
  getFriendships() {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.GET_FRIENDSHIPS}`)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_FRIENDSHIPS,
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
