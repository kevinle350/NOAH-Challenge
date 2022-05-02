import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Rewards from './components/Rewards';
import {
    ApolloClient, 
    InMemoryCache, 
    ApolloProvider,
    HttpLink,
    from,
    ApolloCache
} from '@apollo/client';
import {onError} from '@apollo/client/link/error';

const errorLink = onError(({graphqlErrors, networkError}) => {
    if (graphqlErrors) {
        graphqlErrors.map(({message, location, path}) => {
            alert(`Graphql error ${message}`);
        });
    }
})
const link = from([
    errorLink,
    new HttpLink({uri: "http://localhost:5000/graphql"})
]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link
})

function App() {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Rewards />} />
                    <Route path='/rewards' element={<Rewards />} />
                </Routes>
            </BrowserRouter>
        </ApolloProvider>
    )
}

export default App;
