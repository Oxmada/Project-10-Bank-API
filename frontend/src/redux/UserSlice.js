import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Action pour la connexion
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', credentials);
      const token = response.data.body.token;
      localStorage.setItem('token', token); // Stocke le token
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Erreur de connexion');
    }
  }
);

// Action pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/user/profile',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.body;
    } catch (error) {
      return thunkAPI.rejectWithValue("Erreur lors du chargement du profil");
    }
  }
);

// Action pour recharger le profil au démarrage
export const reloadUserProfile = createAsyncThunk(
  'user/reloadUserProfile',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return thunkAPI.rejectWithValue('Aucun token trouvé');
    }
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/user/profile',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.body;
    } catch (error) {
      localStorage.removeItem('token');
      return thunkAPI.rejectWithValue("Erreur lors du rechargement du profil");
    }
  }
);

// Action pour modifier le profil
export const editUserProfile = createAsyncThunk(
  'user/editUserProfile',
  async ({ firstName, lastName }, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    try {
      const response = await axios.put(
        'http://localhost:3001/api/v1/user/profile',
        { firstName, lastName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.body;
    } catch (error) {
      return thunkAPI.rejectWithValue("Erreur lors de la mise à jour du profil");
    }
  }
);

// Slice Redux
const UserSlice = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('token') || null,
    isLoggedIn: !!localStorage.getItem('token'),
    firstName: '',
    lastName: '',
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isLoggedIn = false;
      state.firstName = '';
      state.lastName = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
      })
      .addCase(reloadUserProfile.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.isLoggedIn = true;
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
      });
  },
});

export const { logout } = UserSlice.actions;
export default UserSlice.reducer;







