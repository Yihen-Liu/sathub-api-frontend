import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserPayloadObject } from '../interfaces'

interface MainState {
    userName: string
    userEmail: null | string
    userAvatar: null | string
    isFieldFocusRegistered: boolean
    jwt:string
    btcaddress:string
}

const initialState: MainState = {
    /* User */
    userName: '',
    userEmail: null,
    userAvatar: null,
    jwt:'',
    btcaddress:'',
    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserPayloadObject>) => {
            state.userName = action.payload.name
            state.userEmail = action.payload.email
            state.userAvatar = action.payload.avatar
            state.jwt = action.payload.jwt
            state.btcaddress=action.payload.btcaddress
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser } = mainSlice.actions

export default mainSlice.reducer
