import React from 'react'
import UserAction from '../../actions/user'
import UserList from '../../components/search/userList'

class SearchForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      value: '',
    }
  }

  updateValue(e) {
    UserAction.searchUsers(e.target.value)
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-6 col-md-offset-3'>
          <div className='page-header text-center'>
            <h1>Search</h1>
          </div>
          <form>
            <div className='form-grou'>
              <input
                value={ this.state.value }
                onChange={this.updateValue.bind(this)}
                type='text'
                className='search-form__input form-control'
                placeholder='Type string to search..'
              />
            </div>
          </form>
          <UserList />,
        </div>
      </div>
    )
  }
}

export default SearchForm
