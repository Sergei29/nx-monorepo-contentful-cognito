import { fetchHeroItemsList } from '../lib/contentful/api/heros';

const HomePage = async () => {
  const [sections, errorFetchSections] = await fetchHeroItemsList();

  console.log('sections: ', sections);

  console.log('errorFetchSections :>> ', errorFetchSections);

  return (
    <>
      <h1 className="my-4 text-3xl text-center font-bold underline">
        <span> Hello there, </span>
        <br />
        Welcome nx-react-monorepo 👋
      </h1>
    </>
  );
};

export default HomePage;
