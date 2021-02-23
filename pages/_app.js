import NProgress from "nprogress";
import Router from "next/router";
import { ApolloProvider } from "@apollo/client";
import Page from "../components/Page";
import "../components/styles/nprogress.css";
import withData from "../lib/withData";

Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeComplete", NProgress.done);
Router.events.on("routeChangeError", NProgress.done);

function MyApp({ Component, pageProps, apollo }) {
  /**
   * apollo - comes from the `withData` fnc
   */

  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

/**
 * Boilerplate
 * What this does is that if any of the pages has `getInitialProps`
 * on them, then we are going to wait for it to completely execute or
 * usually what for the data fetching to complete
 */
MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  pageProps.query = ctx.query;

  return { pageProps };
};

export default withData(MyApp);
