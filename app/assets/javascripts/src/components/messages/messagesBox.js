import React from 'react'
import classNames from 'classNames'
import ReplyBox from '../../components/messages/replyBox'
import MessagesStore from '../../stores/messages'

class MessagesBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {
      messages: MessagesStore.getMessages(),
    }
  }

  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  render() {
    const currentUserID = this.props.openChatID

    const messages = this.state.messages.map((message, index) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.from_user_id !== currentUserID,
        'clear': true,
      })

      if (message.image.url === null) {
        return (
          <li key={ message.id } className={ messageClasses }>
            <div className='message-box__item__contents'>
              { message.text }
            </div>
          </li>
        )
      } else {
        return (
          <li key={ message.id } className={ messageClasses }>
            <img src={ message.image.url } className='message-box__item__contents message-box__item__image'/>
          </li>
        )
      }
    })

    // const lastMessage = this.state.messages[messagesLength - 1]

    // if (lastMessage.from === currentUserID) {
    //   if (this.state.lastAccess.recipient >= lastMessage.timestamp) {
    //     const date = Utils.getShortDate(lastMessage.timestamp)
    //     messages.push(
    //         <li key='read' className='message-box__item message-box__item--read'>
    //           <div className='message-box__item__contents'>
    //             Read { date }
    //           </div>
    //         </li>
    //       )
    //   }
    // }
    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            { messages }
          </ul>
          <ReplyBox />
        </div>
      )
  }
}

MessagesBox.propTypes = {
  openChatID: React.PropTypes.number,
}

export default MessagesBox
