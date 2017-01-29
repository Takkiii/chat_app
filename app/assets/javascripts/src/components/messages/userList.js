import React from 'react'
import classNames from 'classnames'
import UserStore from '../../stores/user'
import UserAction from '../../actions/user'
import MessagesAction from '../../actions/messages'
import MessagesBox from '../../components/messages/messagesBox'

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
    const openChatID = UserStore.getOpenChatUserID()
    MessagesAction.getMessages(openChatID)

    return {
      openChatID: openChatID,
      friendships: friendships,
    }
  }

  // ビューが作成されるときには必ずイベントを追加する
  componentWillMount() {
    UserStore.onChange(this.onStoreChange.bind(this))
  }

  // ビューが削除されたときにイベントも削除する(イベントが削除されずにエラーになることを防ぐ)
  componentWillUnmount() {
    UserStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  deleteFriendships(userID) {
    UserAction.deleteFriendships(userID)
  }

  changeOpenChat(id) {
    MessagesAction.changeOpenChat(id)
  }

  render() {
    const {friendships, openChatID} = this.state

    var friends_list = []
    if (typeof (openChatID) === 'number') {
      friends_list = friendships.map((user, index) => {
        const itemClasses = classNames({
          'user-list__item': true,
          'clear': true,
          // 'user-list__item--new': isNewMessage,
          'user-list__item--active': openChatID === user.id,
        })
        return (
          <li
            onClick={this.changeOpenChat.bind(this, user.id)}
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
    // const messages = this.state.messageList.map((message, index) => {
    //   const date = Utils.getNiceDate(message.lastMessage.timestamp)

    //   var statusIcon
    //   if (message.lastMessage.from !== message.user.id) {
    //     statusIcon = (
    //       <i className='fa fa-reply user-list__item__icon' />
    //     )
    //   }
    //   if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
    //     statusIcon = (
    //       <i className='fa fa-circle user-list__item__icon' />
    //     )
    //   }

    //   var isNewMessage = false
    //   if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
    //     isNewMessage = message.lastMessage.from !== UserStore.getUsers()
    //   }

    //   const itemClasses = classNames({
    //     'user-list__item': true,
    //     'clear': true,
    //     'user-list__item--new': isNewMessage,
    //     'user-list__item--active': this.state.openChatID === message.user.id,
    //   })

    //   return (
    //     <li
    //       onClick={this.changeOpenChat.bind(this, message.user.id)}
    //       className={ itemClasses }
    //       key={ message.user.id }
    //     >
    //       <div className='user-list__item__picture'>
    //         <img src={ message.user.profilePicture } />
    //       </div>
    //       <div className='user-list__item__details'>
    //         <h4 className='user-list__item__name'>
    //           { message.user.name }
    //           <abbr className='user-list__item__timestamp'>
    //             { date }
    //           </abbr>
    //         </h4>
    //         <span className='user-list__item__message'>
    //           { statusIcon } { message.lastMessage.contents }
    //         </span>
    //       </div>
    //     </li>
    //   )
    // }, this)
    return (
      <div>
        <div className='user-list'>
          <ul className='user-list__list'>
            { friends_list }
          </ul>
        </div>
        <MessagesBox {...this.state} />
      </div>
    )
  }
}

export default UserList
