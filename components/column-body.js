import { plainCaption } from '@/lib/format-date';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/Colun.module.css';

const captionComponents = {
  p({ children }) {
    return children;
  },
};

const markdownComponents = {
  a({ href, children }) {
    if (!href || !/^(https?:|mailto:)/i.test(href)) return children;
    const external = /^https?:/i.test(href);
    return (
      <a
        href={href}
        className={styles.link}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
      >
        {children}
      </a>
    );
  },
};

function ColumnImage({ block }) {
  const sized = block.width && block.height;
  const image = sized ? (
    <Image
      src={block.url}
      alt={plainCaption(block.caption)}
      width={block.width}
      height={block.height}
      sizes="(max-width: 800px) 100vw, 720px"
      style={{ width: '100%', height: 'auto' }}
    />
  ) : (
    <div className={styles.unmeasured}>
      <Image
        src={block.url}
        alt={plainCaption(block.caption)}
        fill
        sizes="(max-width: 800px) 100vw, 720px"
        style={{ objectFit: 'contain' }}
      />
    </div>
  );

  return (
    <figure className={styles.figure}>
      {image}
      {block.caption ? (
        <figcaption className={styles.caption}>
          <ReactMarkdown components={{ ...markdownComponents, ...captionComponents }}>
            {block.caption}
          </ReactMarkdown>
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function ColumnBody({ body }) {
  return (
    <div className={styles.prose}>
      {body.map((block, index) => {
        if (block.type === 'image') {
          if (block.paragraph === false) return null;
          return <ColumnImage key={`${block.url}-${index}`} block={block} />;
        }
        const label = block.heading || block.text || '';
        return (
          <div className={styles.block} key={`${index}-${label.slice(0, 24)}`}>
            {block.heading ? (
              <div className={styles.paragraphHeading}>
                <ReactMarkdown components={markdownComponents}>{block.heading}</ReactMarkdown>
              </div>
            ) : null}
            {block.text ? (
              <ReactMarkdown components={markdownComponents}>{block.text}</ReactMarkdown>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
