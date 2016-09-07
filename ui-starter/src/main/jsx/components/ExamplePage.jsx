import React from 'react'
import {connect} from 'react-redux'
import saveUser  from '../actions/userActions';

let createHandlers = function(dispatch) {
  let onClick = function(node, data) {
    dispatch(saveUser.nodeClicked(data))
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
  Name: <input type='text' value = {this.props.myDataProp}/>
<br/>
  Age : <input type='text' value = {this.props.myDataProp} />
<br/>
<button>Save</button>
</div>
)
}
}


