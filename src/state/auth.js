import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist({ key: "user" })

export const userState = atom({
  key: "authState",
  default: {
    isAuth: false,
    user: null,
    errors: false,
  },
  effects_UNSTABLE: [persistAtom],
})
