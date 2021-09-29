import { createSlice } from "@reduxjs/toolkit";
import config from './../config/config'

const authSlice = createSlice({
    name:"auth",
    initialState: {
        userDetails: {
            userName: "",
            userId:"",
            score:0
        },
        loggedIn: false
       
    },
    reducers: {
        setUserDetails: (state, action) => {
            console.log("setUserDetails",state, action.payload)
            state.userDetails = action.payload
            state.loggedIn = true
        },
        updateScore: (state, action) => {
            console.log("setUserDetails",state, action.payload)
            state.userDetails.score = parseInt(state.userDetails.score, 10) + 1
        },
        logoff: (state, action) => {
            console.log("setUserDetails",state, action.payload)
            state.loggedIn = false
        },
    }
})

export const { setUserDetails, updateScore,logoff } = authSlice.actions

export const setUserDetailsAsync = userId => {
  // the inside "thunk function"
  return (dispatch, getState) => {
        fetch(config.baseUrl + "signin", {
            method: "POST",
            body: JSON.stringify({
                userName: userId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            let user =  {
                userName: json.userName,
                userId:json.userId,
                score:json.score
            }
            dispatch(setUserDetails(user))
        })
  }
}
export const updateScoreAsync = userDetails => {
    // the inside "thunk function"
    return (dispatch, getState) => {
        fetch(config.baseUrl + "update", {
            method: "POST",
            body: JSON.stringify({
                userName:userDetails.userName,
                score:parseInt(userDetails.score, 10)   +1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            let user =  {
                userName: json.title,
                userId:json.userId,
                score:json.score
            }
            dispatch(updateScore(user))
        })

    }
  }

export default authSlice.reducer