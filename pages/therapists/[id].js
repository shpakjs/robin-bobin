import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Image from 'next/image';

import Layout from '../../components/layout';
import { getAllTherapistsWithId, getTherapistById } from '../../lib/api';

export default function TherapistPage({ therapist, preview }) {
  const router = useRouter();
  if (!router.isFallback && !therapist?.id) {
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
                  {therapist.name} | RobinBobin
                </title>
              </Head>
              <p>{therapist.name}</p>
              <Image 
                src={therapist.avatar.url}
                height={400}
                width={500}
              />
            </article>
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getTherapistById(params.id, preview);
  return {
    props: {
      preview,
      therapist: {
        ...data?.therapist
      },
    },
  }
}

export async function getStaticPaths() {
  const allTherapists = await getAllTherapistsWithId();
  console.log(allTherapists);
  return {
    paths: allTherapists?.map((therapist) => `/therapists/${therapist.id}`) || [],
    fallback: true,
  }
}
