import { ComponentExample, Button } from '@nx-react-monorepo/components';

const BooksPage = async () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">Books</h1>
      <div className="max-w-xl mx-auto my-4">
        <ComponentExample />
      </div>
      <div className="max-w-xl mx-auto my-4 flex gap-2 flex-wrap justify-center">
        <Button>primary(default)</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="outline">outline</Button>
        <Button variant="destructive">destructive</Button>
        <Button variant="ghost">ghost</Button>
        <Button variant="link">link</Button>
        <Button className=" bg-green-600 hover:bg-green-700 active:bg-green-800 border border-green-800 text-yellow-200">
          custom styled
        </Button>
      </div>
    </>
  );
};

export default BooksPage;
