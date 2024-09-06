import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {TState} from '../utils/typesTS'




   const accountStore = create<TState> () (
    devtools((set) => ({
      SecondName:'', 
      FirstName:'', 
      GivenName:'', 
      Email:'' ,
      password:'' ,
      role:[''],
      phone_number:'',
      updateBears: (newUser:TState) => set({ 
        SecondName:newUser.SecondName ,
        FirstName:newUser.FirstName,
        GivenName:newUser.GivenName,
        Email:newUser.Email,
        role:newUser.role,
        phone_number:newUser.phone_number
        
        }),
   })))

   export default accountStore