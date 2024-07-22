import algoliasearch from "algoliasearch";
// const client = algoliasearch("72GY9734YZ", "f00b718dbdb2d43a110ce6e3e58ee638");
const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
);

const index = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INIT_INDEX!);
export default index;
