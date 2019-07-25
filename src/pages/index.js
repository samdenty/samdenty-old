import React, { useEffect, useState } from 'react'
import Typist from 'react-typist'
import { styled } from 'linaria/react'
import {
  Layout,
  SEO,
  InteractiveLaptop,
  Spotify,
  KeyboardProvider,
  useKeyboard,
  Workstation,
  Page,
  PageCard,
  Carousel,
  SlideTitle,
  LargeButton,
} from '../components'
import { usePauseBackgroundEffect } from '../hooks'
import { motion, AnimatePresence } from 'framer-motion'
import useLockBodyScroll from 'react-use/lib/useLockBodyScroll'
import useMedia from 'react-use/lib/useMedia'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import GatsbyImage from 'gatsby-image'

const LaptopWrapper = styled(motion.div)`
  --laptop-width: calc(15vw + 15vh + 15vmin);

  @media (min-width: 1101px) {
    margin-left: 10vw;
  }

  @media (max-width: 1100px) {
    --laptop-width: 65vw;
  }

  > * {
    margin: 10em 10em 18em;
  }
`

const Laptop = () => {
  const isColumn = useMedia('(max-width: 1100px)')

  return (
    <LaptopWrapper
      variants={{
        hidden: {
          scale: 0,
          opacity: 0,
          translateX: '100%',
          translateY: '-15vh',
        },
        visible: {
          scale: 1,
          opacity: 1,
          translateX: 0,
          translateY: 0,
        },
      }}
      transition={{ type: 'spring', damping: 15, duration: 2 }}
    >
      <InteractiveLaptop
        x={-11}
        y={isColumn ? 0 : -13}
        z={0}
        initial={{ '--screen-degrees': -90 }}
        animate={{ '--screen-degrees': 0 }}
        transition={{ type: 'spring', damping: 100, stiffness: 40, delay: 0.7 }}
      >
        <Workstation />
        {/*<Typist
      onCharacterTyped={char => {
        const keyName = char === '🔙' ? 'delete' : char

        keyboard.pressKey(keyName)
      }}
    >
      <span> First Sentence </span>
      <Typist.Backspace count={8} delay={200} />
      <span> Phrase </span>
    </Typist>*/}
      </InteractiveLaptop>
    </LaptopWrapper>
  )
}

const LogoImg = styled.img``

const FeaturedProjects = () => {
  const featuredProjects = useStaticQuery(graphql`
    query FeaturedProjects {
      allMdx(
        filter: { frontmatter: { featured: { eq: true } } }
        sort: { fields: frontmatter___end_date, order: DESC }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              logo {
                publicURL
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              image {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `).allMdx.edges

  return (
    <Carousel>
      {featuredProjects.map(({ node }) => (
        <React.Fragment key={node.id}>
          <Img fluid={node.frontmatter.image.childImageSharp.fluid} />
          <SlideTitle as={Link} to={node.fields.slug}>
            {node.frontmatter.logo &&
              (node.frontmatter.logo.childImageSharp ? (
                <LogoImg
                  as={GatsbyImage}
                  fluid={node.frontmatter.logo.childImageSharp.fluid}
                />
              ) : (
                <LogoImg src={node.frontmatter.logo.publicURL} />
              ))}
            {node.frontmatter.title}
          </SlideTitle>
        </React.Fragment>
      ))}
    </Carousel>
  )
}

const LargeLink = LargeButton.withComponent(Link)

const pages = [
  <Page title={'SAM\nDENTY'} description={'web designer /\nsoftware engineer.'}>
    <Laptop />
  </Page>,
  <Page
    title={'Featured\nWork'}
    description={
      <LargeLink as={Link} to="/projects">
        See more
      </LargeLink>
    }
  >
    <PageCard>
      <FeaturedProjects />
    </PageCard>
  </Page>,
  <Page title="About Me" description={'I love Design, Technology,\nand Music.'}>
    <PageCard>
      <Spotify />
    </PageCard>
  </Page>,
  <Page title="Get In Touch" description="test">
    <PageCard>test2</PageCard>
  </Page>,
]

const PageWrapper = styled(motion.div)`
  left: 0;
  width: 100%;
  height: 100%;

  @media (min-width: 1101px) {
    padding-bottom: 100px;
  }
`

export default () => {
  const [paused, setPaused] = useState(true)
  const keyboard = useKeyboard()

  useLockBodyScroll()
  // Pause background to increase laptop animation performance
  usePauseBackgroundEffect(paused)
  useEffect(() => {
    const timer = setTimeout(() => setPaused(false), 4500)
    return () => clearTimeout(timer)
  }, [])

  const [animating, setAnimating] = useState(false)
  const [[page, direction], setPage] = useState([0, 0])

  return (
    <KeyboardProvider keyboard={keyboard}>
      <Layout
        style={{ height: '1px' }}
        layoutProps={{
          style: { overflow: 'hidden' },
        }}
        onWheel={({ deltaY }) => {
          if (animating || !deltaY) return

          const direction = deltaY > 0 ? 1 : -1
          const nextPage = page + direction
          if (nextPage > pages.length - 1 || nextPage < 0) return

          setPage([nextPage, direction])
          setAnimating(true)
        }}
      >
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

        <AnimatePresence initial={false} custom={direction}>
          <PageWrapper
            key={page}
            initial="enter"
            animate="visible"
            exit="exit"
            custom={direction}
            onAnimationComplete={() => setAnimating(false)}
            variants={{
              enter: direction => ({
                position: 'absolute',
                padding: 'inherit',
                pointerEvents: 'none',
                translateY: direction < 0 ? '-100vh' : '100vh',
              }),
              visible: {
                padding: '0px',
                pointerEvents: 'initial',
                position: 'relative',
                translateY: 0,
              },
              exit: direction => ({
                position: 'absolute',
                padding: 'inherit',
                pointerEvents: 'none',
                translateY: direction < 0 ? '100vh' : '-100vh',
              }),
            }}
            transition={{
              ease: [0.645, 0.045, 0.355, 1],
              duration: 1,
            }}
          >
            {pages[page]}
          </PageWrapper>
        </AnimatePresence>
      </Layout>
    </KeyboardProvider>
  )
}
