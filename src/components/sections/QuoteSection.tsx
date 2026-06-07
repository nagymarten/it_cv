'use client'

import { useEffect, useRef } from 'react'
import { Box, Text } from '@chakra-ui/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const QUOTE = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip.'
const WORDS = QUOTE.split(' ')

export default function QuoteSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const words = sectionRef.current!.querySelectorAll<HTMLElement>('.quote-word')

      // Set initial state
      gsap.set(sectionRef.current, { scale: 0.95 })
      gsap.set(words, { opacity: 0, y: 15 })

      // Animate section scale
      gsap.to(sectionRef.current, {
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Animate words
      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Box
      as="section"
      ref={sectionRef}
      minH="50vh"
      bg="bg"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={{ base: 8, md: 20 }}
    >
      <Box w="full" h="1px" bg="border.subtle" mb={16} />

      <Text
        as="blockquote"
        fontFamily="mono"
        fontSize={{ base: 'lg', md: '2xl', lg: '3xl' }}
        color="fg"
        fontWeight="700"
        lineHeight="1.4"
        textAlign="center"
        maxW="4xl"
        letterSpacing="-0.02em"
      >
        {WORDS.map((word, i) => (
          <Box
            key={i}
            as="span"
            className="quote-word"
            display="inline-block"
            mr="0.3em"
          >
            {word}
          </Box>
        ))}
      </Text>

      <Box w="full" h="1px" bg="border.subtle" mt={16} />
    </Box>
  )
}
