import Link from 'next/link';
import Image from 'next/image';

export default function Post({
  title,
  body,
  createdAt,
  slug,
  picture
}) {
  return (
    <div>
      <Image 
        src={picture.url}
        width={400}
        height={500}
      />
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">{createdAt}</div>
      <p className="text-lg leading-relaxed mb-4">{body}</p>
    </div>
  )
}
