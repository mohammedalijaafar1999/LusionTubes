import {create} from 'zustand';

interface ClickStore {
    clicked: boolean;
    setClicked: (value: boolean) => void;
}

const useClickStore = create<ClickStore>((set) => ({
  clicked: false,
  setClicked: (value: boolean) => set({ clicked: value }),
}));

export default useClickStore;