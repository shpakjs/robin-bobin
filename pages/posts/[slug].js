import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Post from '../../components/post';
import Layout from '../../components/layout';
import { getAllPostsWithSlug, getPostBySlug } from '../../lib/api';
import Head from 'next/head';

export default function PostPage({ post, preview }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <>
          <article>
            <Head>
              <title>
                {post.title} | RobinBobin
              </title>
            </Head>
            <Post
              title={post.title}
              picture={post.picture}
              createdAt={post.createdAt}
              body={post.body}
            />
          </article>
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostBySlug(params.slug, preview);
  return {
    props: {
      preview,
      post: {
        ...data?.post
      },
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts?.map((post) => `/posts/${post.slug}`) || [],
    fallback: true,
  }
}
