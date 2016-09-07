import request from 'superagent'

export function fetchUser(){
return function (dispatch){
request.get("http://localhost:8080/person/find/")
.end((err, res) => {
if (err) {

  return next({
            type: 'FETCH_USERS_REJECTED',
            err
          })
        }
        const data = JSON.parse(res.text)

next({
          type: 'FETCH_USERS_FULFILLED',
          data
        })
      })
    }

};


