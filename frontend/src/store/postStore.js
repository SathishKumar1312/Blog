import { create } from 'zustand';

export const postStore = create((set, get) => ({
    isAdmin: false,
    setIsAdmin: (data) => set({ isAdmin: data }),
    isLoading: false,
    setIsLoading: (value) => set({ isLoading: value }),
    create: true,
    setCreate: (value) => set({ create: value }),
    update: false,
    deleteState: false,
    setUpdate: (data) => set({ update: data }),
    setDeleteState: (data) => set({ deleteState: data }),
    postUpdate: null,
    setPostUpdate: (data) => set({ postUpdate: data }),
    postDelete: null,
    setPostDelete: (data) => set({ postDelete: data }),
}))