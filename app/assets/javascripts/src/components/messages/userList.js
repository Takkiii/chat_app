import React from 'react'
import classNames from 'classnames'
import UserStore from '../../stores/user'
import UserAction from '../../actions/user'
import MessagesAction from '../../actions/messages'
import MessagesBox from '../../components/messages/messagesBox'
import _ from 'lodash'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    UserAction.getFriendships()
    return this.getStateFromStore()
  }

  getStateFromStore() {
    const friendships = UserStore.getUsers()
    const openChatUserID = UserStore.getOpenChatUserID()
    MessagesAction.getMessages(openChatUserID)

    return {
      openChatUserID: openChatUserID,
      friendships: friendships,
    }
  }

  componentWillMount() {
    UserStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    UserStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  deleteFriendships(userID) {
    UserAction.deleteFriendships(userID)
  }

  changeOpenChat(userID) {
    UserAction.changeOpenChat(userID)
  }

  render() {
    const {friendships, openChatUserID} = this.state

    var friends_list = []
    if (_.isNumber(openChatUserID)) {
      friends_list = friendships.map((user, index) => {
        const itemClasses = classNames({
          'user-list__item': true,
          'clear': true,
          'user-list__item--active': openChatUserID === user.id,
        })
        return (
          <li
            onClick={ this.changeOpenChat.bind(this, user.id) }
            className={ itemClasses }
            key={ user.id }
          >
            <div
              onClick={ this.deleteFriendships.bind(this, user.id) }
              className='pull-right'
            >
              <span
                aria-hidden={true}
                className='glyphicon glyphicon-remove'
              ></span>
            </div>
            <div className='user-list__item__picture'>
              <img src='/assets/images/default_image.jpg' />
            </div>
            <div className='user-list__item__details'>
              <h4 className='user-list__item__name'>
                { user.name }
              </h4>
            </div>
          </li>
        )
      }, this)
    }
    return (
      <div>
        <div className='user-list'>
          <ul className='user-list__list'>
            { friends_list }
          </ul>
        </div>
        <MessagesBox openChatUserID={openChatUserID} />
      </div>
    )
  }
}

export default UserList
