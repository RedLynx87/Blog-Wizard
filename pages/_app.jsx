import "@/styles/globals.css";
import { BlogProvider } from "../context/BlogContext";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <BlogProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </BlogProvider>
  );
}
