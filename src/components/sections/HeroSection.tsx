'use client'

import { useEffect, useRef } from 'react'
import { Box, Text } from '@chakra-ui/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet.']

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      // Words start at y:60 (opacity already 0 via inline style in JSX)
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.hero-word'),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out' }
      )

      // Parallax scrub on headline
      gsap.to('.hero-headline', {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Scroll indicator fade out on scroll
      gsap.to('.scroll-indicator', {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '20% top',
          scrub: true,
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
      pt="64px"
      bg="bg"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      <Box className="hero-headline" textAlign="center" px={8}>
        <Text
          as="h1"
          fontFamily="mono"
          fontWeight="800"
          color="fg"
          lineHeight="1.1"
          letterSpacing="-0.03em"
          fontSize="clamp(3rem, 8vw, 7rem)"
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={{ base: '0.3em', md: '0.4em' }}
        >
          {HEADLINE.map((word, i) => (
            <Box key={i} as="span" className="hero-word" display="inline-block" style={{ opacity: 0 }}>
              {word}
            </Box>
          ))}
        </Text>
      </Box>

      {/* Scroll indicator */}
      <Box
        className="scroll-indicator"
        position="absolute"
        bottom="40px"
        left="50%"
        transform="translateX(-50%)"
        textAlign="center"
      >
        <Text
          fontFamily="mono"
          fontSize="11px"
          letterSpacing="0.2em"
          color="fg.subtle"
          css={{
            animation: 'pulse-opacity 2s ease-in-out infinite',
            '@keyframes pulse-opacity': {
              '0%, 100%': { opacity: 0.4 },
              '50%': { opacity: 1 },
            },
          }}
        >
          SCROLL ↓
        </Text>
      </Box>
    </Box>
  )
}
