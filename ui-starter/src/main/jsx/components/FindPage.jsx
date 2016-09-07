import React from 'react'
import {connect} from 'react-redux'
import fetchUser from '../actions/findAction'
import UserList from './UserList'

let createHandlers = function(dispatch) {
  let onClick = function(node, data) {
    dispatch(fetchUser.nodeClicked(data))
  };

return {
    onClick,
  };

  render() 
{
      return (
         <div>
            <App myDataProp = {this.state.users} >
               </App >
<UserList users = {this.props.users} />
         </div>
      );
   }
}



export default class App extends React.Component{

constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch);

}

render(){

return (
<div>
  Find : <input type='text' value = {this.props.myDataProp}/>
<br/>
<button>Find</button>
</div>
)
}
}


