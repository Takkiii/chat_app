import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  SEND_MESSAGE: null,
  SEND_IMAGE: null,
  GET_MESSAGE: null,
  UPDATE_OPEN_CHAT_ID: null,
  SEARCH_USERS: null,
  CREATE_FRIENDSHIPS: null,
  DELETE_FRIENDSHIPS: null,
  GET_FRIENDSHIPS: null,
})

// CSRF
export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

// API EndPoint
const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  SEND_MESSAGE: APIRoot + '/messages',
  SEND_IMAGE: APIRoot + '/messages/upload_image',
  GET_MESSAGE: APIRoot + '/messages',
  SEARCH_USERS: APIRoot + '/users/search',
  CREATE_FRIENDSHIPS: APIRoot + '/friendships',
  DELETE_FRIENDSHIPS: APIRoot + '/friendships/',
  GET_FRIENDSHIPS: APIRoot + '/friendships',
}
