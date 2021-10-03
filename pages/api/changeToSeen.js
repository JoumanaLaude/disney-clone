import { GraphQLClient } from "graphql-request"

// mutation - check graphql mutation document in playground
// overwriting video element from false to true
export default async ({ body }, res) => {
    const graphcms = new GraphQLClient(process.env.ENDPOINT, {
        headers: { "Authorization": process.env.DISNEY_CLONE_TOKEN }
    })

    await graphcms.request(
        `mutation($slug: String!) {
            updateVideo(where: 
            { slug: $slug }, 
            data: { seen: true }
            ) {
              id,
              title,
              seen
            }
          }`,
        { slug: body.slug }
    )

    // mutation to publish the video
    await graphcms.request(
        `mutation publishVideo($slug: String) {
            publishVideo(where: {slug: $slug}, to: PUBLISHED) {
                slug
            }
        }`,
        { slug: body.slug }
    )

    res.status(201).json({ slug: body.slug })
}