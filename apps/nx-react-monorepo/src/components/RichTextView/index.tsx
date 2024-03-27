import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

import type { Node } from '@contentful/rich-text-types';
import type { Asset, RichTextContent } from '../../types';

type RichTextAssetProps = { id: string; assets?: Asset[] };

const RichTextAsset = ({ id, assets }: RichTextAssetProps) => {
  const asset = assets?.find((asset) => asset.sys.id === id);

  if (asset?.url) {
    return <Image src={asset.url} layout="fill" alt={asset.description} />;
  }

  return null;
};

type Props = {
  content: RichTextContent;
  className?: string;
};

const RichTextView = ({ content, className }: Props) => {
  return (
    <div className={className}>
      {documentToReactComponents(content.json, {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (node: Node) => (
            <RichTextAsset
              id={node.data.target.sys.id}
              assets={content.links.assets.block}
            />
          ),
        },
      })}
    </div>
  );
};

export default RichTextView;
