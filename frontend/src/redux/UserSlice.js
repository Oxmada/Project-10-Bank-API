import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', credentials)
      return response.data.body.token
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Erreur de connexion')
    }
  }
)

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().user.token
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/user/profile',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      return response.data.body
    } catch (error) {
      return thunkAPI.rejectWithValue("Erreur lors du chargement du profil")
    }
  }
)

export const editUserProfile = createAsyncThunk(
  'user/editUserProfile',
  async ({ firstName, lastName }, thunkAPI) => {
    const token = thunkAPI.getState().user.token
    try {
      const response = await axios.put(
        'http://localhost:3001/api/v1/user/profile',
        { firstName, lastName },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      return response.data.body
    } catch (error) {
      return thunkAPI.rejectWithValue("Erreur lors de la mise à jour du profil")
    }
  }
)

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    isLoggedIn: false,
    firstName: '',
    lastName: '',
  },
  reducers: {
    logout: (state) => {
      state.token = null
      state.isLoggedIn = false
      state.firstName = ''
      state.lastName = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload
        state.isLoggedIn = true
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName
        state.lastName = action.payload.lastName
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName
        state.lastName = action.payload.lastName
      })
  },
})

export const { logout } = UserSlice.actions
export default UserSlice.reducer





