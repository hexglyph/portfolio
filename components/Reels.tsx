//Reels component

import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

const ReelsComponent = () => {
    const data = useStaticQuery(graphql`
        query {
            placeholderImage: file(relativePath: { eq: "reels.png" }) {
                childImageSharp {
                    fluid(maxWidth: 300) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `)

    return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
}

export default ReelsComponent