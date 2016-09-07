export default function reducer (state = {

users: {
                    names: 'Bob',
                    age: 10,
id:1,
 },
person:[],
fetching:false,
fetched:false,
error:null
},action){

switch(action.type){
case "SAVE_USERS":{
return Object.assign({}, state, {
      fetching:false
    });
}

case "SAVE_USERS_FULFILLED":{

return Object.assign({}, state, {
      feteched:true,users:action.payload
    });

}
case "SAVE_USERS_REJECTED":{
return Object.assign({}, state, {
      fetching:false,error:action.payload
    });

}
case "FETCH_USERS":{
return Object.assign({}, state, {
      fetching:true
    });

}

case "FETCH_USERS_FULFILLED":{
return Object.assign({}, state, {
      fetching:false,feteched:true,users:action.payload
    });
}

case "FETCH_USERS_REJECTED":{
return Object.assign({}, state, {
      fetching:false,error:action.payload
    });
}
}
return state;
}

