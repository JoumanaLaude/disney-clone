import { gql, GraphQLClient } from 'graphql-request'
import { useState } from 'react'


export const getServerSideProps = async (pageContext) => {
  const url = process.env.ENDPOINT
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization": process.env.DISNEY_CLONE_TOKEN
    }
  })

  const pageSlug = pageContext.query.slug // assigned pageSlug a value

  const query = gql`
    query($pageSlug: String!) {
        video(where: {
          slug: $pageSlug
        }) {
          id,
          title,
          description,
          seen,
          slug,
          tags,
          thumbnail {
            url
          },
          mp4 {
            url
          }
        }
      }
    `
  const variables = {
    pageSlug
  }
  // then pageSlug is a variable

  const data = await graphQLClient.request(query, variables)
  const video = data.video // getting video back
  return {
    props: {
      video
    }
  }
}

const changeToSeen = async (slug) => {
  await fetch('/api/changeToSeen', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ slug })
  })
}

const Video = ({ video }) => {
  const [watching, setWatching] = useState(false)
  console.log(video)

  return (
    <>
      {/* if not watching then we see thumbnail & play button V */}
      {!watching && <img
        src={video.thumbnail.url}
        alt={video.title}
        className="video-image"
      />}
      {!watching && <div className="info">
        <p>{video.tags.join(', ')}</p>
        <p>{video.description}</p>
        <a href="/"><p>go back</p></a>

        <button
          className={"video-overlay"}
          onClick={() => {
            changeToSeen(video.slug)
            watching ? setWatching(false) : setWatching(true)
          }}
        >PLAY</button>
      </div>}

      {watching && (
        <video width="100%" controls>
          <source src={video.mp4.url} type="video/mp4" />
        </video>
      )}

      {/* for when we click out of the video */}
      <div className={"info-footer"} onClick={() => watching ? setWatching(false) : null}></div>
    </>
  )
}

export default Video
