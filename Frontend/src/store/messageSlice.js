import { createSlice } from '@reduxjs/toolkit';

// Load messages from localStorage (if available)
const loadMessages = () => {
  try {
    const stored = localStorage.getItem('messages');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load messages from localStorage", error);
    return [];
  }
};

const saveMessages = (messages) => {
  try {
    localStorage.setItem('messages', JSON.stringify(messages));
  } catch (error) {
    console.error("Failed to save messages to localStorage", error);
  }
};

const initialState = {
  messages: loadMessages(),
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
        console.log("Action Payload : ",action.payload);
      state.messages.push(action.payload);
      saveMessages(state.messages);
    },
    deleteMessage: (state, action) => {
      state.messages = state.messages.filter(msg => msg.id !== action.payload);
      saveMessages(state.messages);
    },
    clearMessages: (state) => {
      state.messages = [];
      saveMessages([]);
    },
  },
});

export const { addMessage, deleteMessage, clearMessages } = messageSlice.actions;

export default messageSlice.reducer;
