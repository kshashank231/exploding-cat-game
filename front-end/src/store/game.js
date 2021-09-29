import { createSlice } from "@reduxjs/toolkit";
import config from './../config/config'

const gameSlice = createSlice({
    name:"game",
    initialState: {
        defuse:false,
        gameStatus:"inprogress",
        leaderBoard:[]
    },
    reducers: {
        setDefuse: (state, action) => {
            console.log("setDefuse",state, action.payload)
            state.defuse = action.payload
        },
        setStatus: (state, action) => {
            console.log("setDefuse",state, action.payload)
            state.gameStatus = action.payload
        },
        updateLeaderBoard: (state, action)=> {
            console.log("updateLeaderBoard",state, action.payload)
            state.leaderBoard = action.payload
        }
       
    }
})

export const {setStatus, setDefuse, updateLeaderBoard } = gameSlice.actions

export const getLeaderBoard = () => {
    // the inside "thunk function"
    return (dispatch, getState) => {
        fetch(config.baseUrl + "getLeaderBoard")
        .then(response => response.json())
        .then(json => {
            console.log(json)
            dispatch(updateLeaderBoard(json.data))
        })

    }
  }


export default gameSlice.reducer