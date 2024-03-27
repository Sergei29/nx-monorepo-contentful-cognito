import clsx from 'clsx';

type Props = {
  src: string;
  className?: string;
};

export const YouTubeVideo = ({ src, className }: Props): JSX.Element => (
  <div className={clsx('max-w-5xl mx-auto flex justify-end', className)}>
    <iframe
      width="560"
      height="315"
      src={src}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  </div>
);

export default YouTubeVideo;
