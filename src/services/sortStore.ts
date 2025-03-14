import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {TSortState} from '../utils/typesTS'




   const sortStore = create<TSortState> () (
    devtools((set) => ({
     sortName:'',
      updateSort: (newUser:TSortState) => set({
       sortName:newUser.sortName    
        }),
   })))

   export default sortStore 