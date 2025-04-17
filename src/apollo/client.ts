import {ApolloClient , createHttpLink, InMemoryCache} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { User } from "oidc-client-ts"
import { makeVar } from '@apollo/client';


export const selectedProjectIdVar = makeVar<number| null>(null);
export const selectedOUVar = makeVar<number | null>(null);
export const selectedStreetVar = makeVar<number | null>(null);

function getUser() {
  const oidcStorage = sessionStorage.getItem(`oidc.user:https://upravbot.ru/IDS4:mvc`)
  if (!oidcStorage) {
      return null;
  }

  return User.fromStorageString(oidcStorage);
}





const httpLink = createHttpLink({
    uri: 'https://localhost:5001/graphql',
  });
  

  

 
  const authLink = setContext((_, { headers }) => {
   
  
    
    
    const user = getUser();
    const token = user?.access_token;
  
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(
      {
       typePolicies: {
           //   CompanyBills:{
               
            // keyFields:["balanceCompanyId"] 
          
          //     },
      Query: {
         fields: {
           companyBills:{  
            read(_, { args, toReference  }) {
              return  toReference({
                 __typename: 'CompanyBills' ,
                 id:args?.id
                            
              });
           },

           merge(existing, incoming) {
            return incoming;
        }
          
         },
         gilFindObjects:{  
          read(_, { args, toReference  }) {
            return  toReference({
               __typename: 'GilFindObjects' ,
               id:args?.id
                          
            });
         },

         merge(existing, incoming) {
          return incoming;
      }
        
       },
       usersInfo:{  
        read(_, { args, toReference  }) {
          return  toReference({
             __typename: 'UsersInfo' ,
             id:args?.id
                        
          });
       },

       merge(existing, incoming) {
        return incoming;
    }
      
     }


         
       }
       
    }
     }
   }
  ),
    
})


export default client;
