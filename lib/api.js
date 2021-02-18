const API_URL = 'https://graphql.datocms.com'
const API_TOKEN = process.env.DATOCMS_API_TOKEN

async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch(API_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getPreviewPostBySlug(slug) {
  const data = await fetchAPI(
    `
    query PreviewPostBySlug($slug: String) {
      post(filter: {slug: {eq: $slug}}) {
        slug
      }
    }`,
    {
      preview: true,
      variables: {
        slug,
      },
    }
  )
  return data?.post
}

export async function getAllPostsWithSlug() {
  const data = fetchAPI(`
    {
      allPosts {
        slug
      }
    }
  `)
  return data?.allPosts
}

export async function getAllPosts(preview) {
  const data = await fetchAPI(
    `
    {
      allPosts(first: 20) {
        title
        slug
        picture {
          id
          url
        }
        createdAt
      }
    }
  `,
    { preview }
  )
  return data?.allPosts
}

export async function getAllTherapists(preview) {
  const data = await fetchAPI(
    `
    {
      allTherapists(first: 20) {
        id
        name
        bio
        avatar {
          id
          url
        }
      }
    }
  `,
    { preview }
  )
  return data?.allTherapists
}

export async function getAllTherapistsWithId() {
  const data = fetchAPI(`
    {
      allTherapists {
        id
      }
    }
  `)
  return data?.allTherapists
}

export async function getTherapistById(id, preview) {
  const data = await fetchAPI(
    `
  query TherapistById($id: ItemId) {
    therapist(filter: {id: {eq: $id}}) {
      id
      name
      bio
      avatar {
        id
        url
      }
    }
  }
  `,
    {
      preview,
      variables: {
        id,
      },
    }
  )
  return data
}

export async function getPostBySlug(slug, preview) {
  const data = await fetchAPI(
    `
  query PostBySlug($slug: String) {
    post(filter: {slug: {eq: $slug}}) {
      title
      slug
      picture {
        id
        url
      }
      createdAt
      body
    }
  }
  `,
    {
      preview,
      variables: {
        slug,
      },
    }
  )
  return data
}
