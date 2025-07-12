import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', credentials)
      return response.data.token
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Erreur de connexion')
    }
  }
)

const UserSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isLoggedIn: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.token = null
      state.isLoggedIn = false
    },
  },
})

export const { loginSuccess, logout } = UserSlice.actions
export default UserSlice.reducer


