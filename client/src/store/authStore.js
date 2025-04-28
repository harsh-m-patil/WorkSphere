import { IMAGE_URL } from '@/utils/constants';
import { create } from 'zustand';
import { io } from 'socket.io-client';

const getUserFromStorage = () => {
  const stored = localStorage.getItem('user');
  return stored ? JSON.parse(stored) : null;
};

const useAuthStore = create((set, get) => ({
  user: getUserFromStorage(),
  token: localStorage.getItem('token') || null,

  login: ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('id', user._id);
    localStorage.setItem('token', token);

    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    set({ user: null, token: null });
  },

  connectSocket: () => {
    const { user } = get();
    if (!user || get().socket?.connected) return;

    const socket = io(IMAGE_URL, {
      query: {
        userId: user._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on('getOnlineUsers', (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));

export default useAuthStore;
