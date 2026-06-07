'use client'

import { useEffect, useRef } from 'react'
import { Box, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  { num: '01', title: 'Lorem ipsum', desc: 'Consectetur adipiscing elit, sed do eiusmod.' },
  { num: '02', title: 'Dolor sit amet', desc: 'Ut labore et dolore magna aliqua enim.' },
  { num: '03', title: 'Consectetur elit', desc: 'Quis nostrud exercitation ullamco laboris.' },
  { num: '04', title: 'Sed do eiusmod', desc: 'Nisi ut aliquip ex ea commodo consequat.' },
  { num: '05', title: 'Tempor incididunt', desc: 'Duis aute irure dolor in reprehenderit.' },
  { num: '06', title: 'Ut labore dolore', desc: 'Excepteur sint occaecat cupidatat non.' },
]

export default function GridSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      // Set initial state for flash prevention
      gsap.set('.grid-card', { opacity: 0, y: 50 })
      ScrollTrigger.batch('.grid-card', {
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.08,
          }),
        start: 'top 88%',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Box
      as="section"
      ref={sectionRef}
      minH="80vh"
      bg="black"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      py={20}
      px={{ base: 6, md: 16 }}
    >
      <Text
        fontFamily="mono"
        fontSize="11px"
        letterSpacing="0.25em"
        color="#444"
        mb={12}
      >
        02 / WORKS
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: 4, md: 6 }}>
        {CARDS.map((card) => (
          <Box
            key={card.num}
            className="grid-card"
            border="1px solid"
            borderColor="#222"
            p={6}
            _hover={{ borderColor: '#444' }}
            transition="border-color 0.2s"
          >
            <VStack align="flex-start" gap={3}>
              <Text fontFamily="mono" fontSize="10px" color="#444" letterSpacing="0.2em">
                {card.num}
              </Text>
              <Text fontFamily="mono" fontSize="sm" color="white" fontWeight="600">
                {card.title}
              </Text>
              <Text fontFamily="mono" fontSize="xs" color="#666" lineHeight="1.7">
                {card.desc}
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
