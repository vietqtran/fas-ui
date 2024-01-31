export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'

export const setUser = (user: any) => {
   return {
      type: SET_USER,
      payload: user
   }
}

export const removeUser = () => {
   return {
      type: REMOVE_USER
   }
}
