import * as React from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wrap } from '@popmotion/popcorn'
import { styled } from 'linaria/react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const variants = {
  enter: direction => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: direction => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
}

const StyledCarousel = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  user-select: none;
`

export const SlideTitle = styled.h4`
  font-family: Gilroy;
  display: flex;
  text-decoration: none;
  align-items: center;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  width: 100%;
  box-shadow: inset 0 -8.5rem 4rem -6rem rgba(0, 0, 0, 0.8);
  font-size: 2rem;
  color: #fff;
  opacity: 0.7;
  margin: 0;
  padding: 2rem 3rem;
  transition: opacity 0.2s ease;

  > *:first-child {
    margin-right: 1rem;
    height: 1em;
  }

  &:hover {
    opacity: 1;
  }
`

const Slide = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 100%;

  .gatsby-image-wrapper {
    top: 50%;
    width: 100%;
    height: 100%;
    left: 0;
    transform: translateY(-50%);

    img {
      object-position: left center !important;
    }
  }
`

const Paginate = styled(IoIosArrowBack)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 100%;
  width: 4rem;
  padding: 1rem;
  color: rgba(255, 255, 255, 0.6);
  mix-blend-mode: difference;
  z-index: 1;
  transition: color 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.95);
  }

  & + & {
    right: 0;
  }
`

export const Carousel = ({ children, interval = 5, paused = false }) => {
  children = React.Children.toArray(children)

  const [isPaused, setPaused] = useState(paused)
  const [[page, direction], setPage] = useState([0, 0])

  const imageIndex = wrap(0, children.length, page)

  const paginate = (newDirection, userInitiated = true) => {
    setPage(([page]) => [page + newDirection, newDirection])

    if (userInitiated) setPaused(true)
  }

  React.useEffect(() => {
    if (isPaused) return

    const id = setInterval(() => {
      paginate(1, false)
    }, interval * 1000)

    return () => clearInterval(id)
  }, [isPaused, interval])

  return (
    <StyledCarousel>
      <AnimatePresence initial={false} custom={direction}>
        <Slide
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 200 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
        >
          {children[imageIndex]}
        </Slide>
      </AnimatePresence>
      <Paginate onClick={() => paginate(-1)} />
      <Paginate as={IoIosArrowForward} onClick={() => paginate(1)} />
    </StyledCarousel>
  )
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity
}
