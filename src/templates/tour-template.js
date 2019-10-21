import React from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'
import styles from '../css/template.module.css'
import { FaMoneyBillWave, FaMap } from 'react-icons/fa'

const TourTemplate = ({ data }) => {
  const {
    name,
    price,
    country,
    start,
    description: { description },
    days,
    images,
    journey,
  } = data.tour
  return (
    <Layout>
      <section className={styles.template}>
        <div className={styles.center}>
          <div className={styles.images}>
            {images.map((img, i) => (
              <Image
                key={i}
                fluid={img.fluid}
                alt={name}
                className={styles.image}
              />
            ))}
          </div>
          <h2>{name}</h2>
          <div className={styles.info}>
            <p>
              <FaMoneyBillWave className={styles.icon} />
              starting from ${price}
            </p>
            <p>
              <FaMap className={styles.icon} />
              {country}
            </p>
          </div>
          <h4>starts on: {start}</h4>
          <h4>duration: {days} says</h4>
          <p className={styles.desc}>{description}</p>
          <h2>daily schedule</h2>
          <ul className={styles.journey}>
            {journey.map((j, i) => (
              <li key={i}>{j.day}</li>
            ))}
          </ul>
          <Link to="/tours">Back to tours</Link>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    tour: contentfulTour(slug: { eq: $slug }) {
      name
      price
      country
      start(formatString: "dddd MMM Do, YYYY")
      description {
        description
      }
      days
      journey {
        day
        info
      }
      images {
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`

export default TourTemplate
