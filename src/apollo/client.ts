import {ApolloClient , createHttpLink, InMemoryCache} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { User } from "oidc-client-ts"


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
      Query: {
        fields: {
          balanceCompany:{
            read(_, { args, toReference }) {
              return toReference({
                __typename: 'BalanceCompany',
                id: args?.id,
              });
          }
        }

      }
    }
    }
  }
),
    
})


export default client;
