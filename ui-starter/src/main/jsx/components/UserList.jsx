import React from 'react'

import User from './User'

export default class UserList extends React.Component{

render(){
if(Object.getOwnPropertyNames(this.props.person).length == 0){
return (<div></div>)
}

var userNodes=this.props.person.map(function(listUser){
return (
<User name= {listUser.name} key= {listUser.id}>
{listUser.name} 
</User>
)

})

return (
<div>
 <h1> Users </h1>
{userNodes}
</div>
)
}
}


