'use client'

import { useEffect, useRef } from 'react'
import { Box, Container, Text, VStack } from '@chakra-ui/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PARAGRAPHS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error.',
]

export default function IntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.intro-para', sectionRef.current).forEach((el, i) => {
        gsap.set(el, { opacity: 0, y: 40 })
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: i * 0.15,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Box
      as="section"
      ref={sectionRef}
      minH="60vh"
      bg="black"
      display="flex"
      alignItems="center"
      py={20}
    >
      <Container maxW="2xl" px={{ base: 6, md: 12 }}>
        <VStack align="flex-start" gap={8}>
          <Text
            fontFamily="mono"
            fontSize="11px"
            letterSpacing="0.25em"
            color="#444"
          >
            01 / INTRO
          </Text>

          {PARAGRAPHS.map((text, i) => (
            <Text
              key={i}
              className="intro-para"
              fontFamily="mono"
              fontSize={{ base: 'sm', md: 'md' }}
              color="#999"
              lineHeight="1.9"
            >
              {text}
            </Text>
          ))}
        </VStack>
      </Container>
    </Box>
  )
}
