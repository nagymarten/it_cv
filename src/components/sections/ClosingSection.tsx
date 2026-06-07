'use client'

import { useEffect, useRef } from 'react'
import { Box, Text } from '@chakra-ui/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ClosingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const text = sectionRef.current!.querySelector<HTMLElement>('.closing-text')
      if (!text) return
      gsap.set(text, { y: -40, opacity: 0 })
      gsap.to(text, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Box
      as="section"
      ref={sectionRef}
      minH="100vh"
      bg="black"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text
        className="closing-text"
        fontFamily="mono"
        fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
        fontWeight="800"
        color="white"
        letterSpacing="-0.03em"
        display="inline-flex"
        alignItems="baseline"
        gap={1}
      >
        — fin.
        <Box
          as="span"
          display="inline-block"
          w="3px"
          h={{ base: '2rem', md: '3rem' }}
          bg="white"
          ml={2}
          css={{
            animation: 'blink 1.1s step-end infinite',
            '@keyframes blink': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0 },
            },
          }}
        />
      </Text>
    </Box>
  )
}
