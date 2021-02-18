import Link from 'next/link';

import Layout from '../../components/layout';
import { getAllPosts } from '../../lib/api';

export default function Posts({ allPosts }) {
  return (
    <>
      <Layout>
        <div>{
          allPosts.map(post => (
            <>
              <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                <a className="hover:underline">{post.title}</a>
              </Link>
              <br/>
            </>
          ))
        }
        </div>
        
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPosts(preview)) || [];
  return {
    props: { allPosts },
  }
}
