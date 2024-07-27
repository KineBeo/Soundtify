import algoliasearch from "algoliasearch";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
);

const index = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INIT_INDEX!);
export default index;
