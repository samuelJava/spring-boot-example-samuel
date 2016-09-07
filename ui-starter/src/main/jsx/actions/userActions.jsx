import request from 'superagent'

export function saveUser(){
return function (dispatch){
request.get("http://localhost:8080/person/save")
.end((err, res) => {
if (err) {

  return next({
            type: 'SAVE_USERS_REJECTED',
            err
          })
        }
        const data = JSON.parse(res.text)

next({
          type: 'SAVE_USERS_FULFILLED',
          data
        })
      })
    }

};