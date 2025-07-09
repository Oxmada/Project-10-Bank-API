import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  token: null,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true
      state.token = action.payload.token
      state.user = action.payload.user
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.token = null
      state.user = null
    },
    updateUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { loginSuccess, logout, updateUser } = authSlice.actions
export default authSlice.reducer
