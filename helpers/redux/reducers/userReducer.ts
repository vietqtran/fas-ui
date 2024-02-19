const initialState = {
   user: null
}

export const userReducer = (state = initialState, action: any) => {
   switch (action.type) {
      case 'SET_USER':
         return {
            ...state,
            user: action.payload
         }
      case 'REMOVE_USER':
         return {
            ...state,
            user: null
         }
      default:
         return state
   }
}
