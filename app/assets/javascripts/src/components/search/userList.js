import React from 'react'
import UserStore from '../../stores/user'
import UserAction from '../../actions/user'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {
      users: UserStore.getUsers(),
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

  // これ第一引数になぜthisを渡してるんだ？
  createFriendships(user_id) {
    UserAction.createFriendships(user_id)
  }

  render() {
    const users = this.state.users.map((user, index) => {
      return (
        <li key={user.id} onClick={this.createFriendships.bind(this, user.id)} className='list-group-item'>{ user.name }</li>
      )
    })
    return (
      <div>
        <ul className='list-group'>{ users }</ul>
      </div>
    )
  }
}

export default UserList
