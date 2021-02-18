import Link from 'next/link';

import Layout from '../../components/layout';
import { getAllTherapists, getAllTherapistsWithId } from '../../lib/api';

export default function Therapists({ allTherapists }) {
  return (
    <>
      <Layout>
        <div>{
          allTherapists.map(therapist => (
            <>
              <Link as={`/therapists/${therapist.id}`} href="/therapists/[id]">
                <a className="hover:underline">{therapist.name}</a>
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
  const allTherapists = (await getAllTherapists(preview)) || [];

  return {
    props: { allTherapists },
  }
}
