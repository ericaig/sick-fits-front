import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/link-error";
import { getDataFromTree } from "@apollo/react-ssr";
import { createUploadLink } from "apollo-upload-client";
import withApollo from "next-with-apollo";
import { endpoint, prodEndpoint } from "../config";

function createClient({ headers, initialState }) {
  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          );
      }),
      // this uses apollo-link-http under the hood, so all the options here come from that package
      createUploadLink({
        uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
        fetchOptions: {
          // This is sends saved cookies to server for all requests (like JWT, ...)
          credentials: "include",
        },
        // pass the headers along from this request. This enables SSR with logged in state
        headers,
      }),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // TODO: We will add this together!
            // allProducts: paginationField(),
          },
        },
      },
    }).restore(initialState || {}),
  });
}

/**
 * this allows us to crawl all of our pages and component and look for any queries
 * that we have (queries for orders, users, products...); it'll crawl them
 * and it'll make sure that we have fetched and wait for those datas to be complete
 * before sending the html from the server to the client. This is also another
 * useful way to avoid page flickering
 */
export default withApollo(createClient, { getDataFromTree });
