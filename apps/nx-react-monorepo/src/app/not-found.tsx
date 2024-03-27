import Image from 'next/image';

const NotFoundPage = (): JSX.Element => (
  <div className=" h-screen flex flex-col justify-center items-center relative">
    <h1 className="font-bold text-3xl text-teal-600">Oups!...</h1>
    <Image
      src="https://i.imgur.com/FOeYt4E.png"
      alt="oustrich"
      width={400}
      height={400}
      priority
    />
    <span className=" text-3xl relative right-[-14vw] bottom-[10vh]">😜</span>
    <h2 className="font-bold text-2xl text-teal-600">Not found</h2>
    <p>We haven&rsquo;t found the page you have requested.</p>
  </div>
);

export default NotFoundPage;
