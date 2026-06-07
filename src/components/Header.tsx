'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  Link,
  IconButton,
  VStack,
  Drawer,
  Portal,
  CloseButton,
} from '@chakra-ui/react'
import { ColorModeButton } from '@/components/ui/color-mode'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

function HamburgerIcon() {
  return (
    <Box as="span" display="flex" flexDirection="column" gap="5px">
      <Box w="22px" h="2px" bg="white" borderRadius="full" />
      <Box w="22px" h="2px" bg="white" borderRadius="full" />
      <Box w="14px" h="2px" bg="white" borderRadius="full" />
    </Box>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Box
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={50}
        transition="background 0.3s, backdrop-filter 0.3s, border-color 0.3s"
        bg={scrolled ? 'rgba(8,8,13,0.72)' : 'transparent'}
        style={{ backdropFilter: scrolled ? 'blur(16px)' : 'none' }}
        borderBottom="1px solid"
        borderColor={scrolled ? 'whiteAlpha.100' : 'transparent'}
      >
        <Container maxW="6xl" px={{ base: 4, md: 8 }}>
          <Flex h="64px" align="center" justify="space-between">
            {/* Logo */}
            <Link href="#top" _hover={{ textDecoration: 'none' }}>
              <HStack gap={2}>
                <Flex
                  w="34px"
                  h="34px"
                  align="center"
                  justify="center"
                  borderRadius="lg"
                  bg="violet.500"
                  fontSize="sm"
                  fontWeight="bold"
                  color="white"
                  letterSpacing="tight"
                >
                  MN
                </Flex>
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  color="white"
                  display={{ base: 'none', sm: 'block' }}
                  letterSpacing="wide"
                >
                  Martin Nagy
                </Text>
              </HStack>
            </Link>

            {/* Desktop nav */}
            <HStack as="nav" gap={1} display={{ base: 'none', md: 'flex' }}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  px={3}
                  py={2}
                  borderRadius="md"
                  fontSize="sm"
                  color="gray.300"
                  fontWeight="medium"
                  transition="color 0.15s, background 0.15s"
                  _hover={{ color: 'white', bg: 'whiteAlpha.100', textDecoration: 'none' }}
                >
                  {item.label}
                </Link>
              ))}
              <ColorModeButton color="gray.300" _hover={{ color: 'white', bg: 'whiteAlpha.100' }} />
            </HStack>

            {/* Mobile: color mode + hamburger */}
            <HStack gap={1} display={{ base: 'flex', md: 'none' }}>
              <ColorModeButton color="gray.300" _hover={{ color: 'white', bg: 'whiteAlpha.100' }} />
              <IconButton
                aria-label="Open menu"
                variant="ghost"
                color="white"
                _hover={{ bg: 'whiteAlpha.100' }}
                onClick={() => setMobileOpen(true)}
              >
                <HamburgerIcon />
              </IconButton>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Mobile drawer */}
      <Drawer.Root
        open={mobileOpen}
        onOpenChange={(e) => setMobileOpen(e.open)}
        placement="end"
      >
        <Portal>
          <Drawer.Backdrop bg="blackAlpha.700" backdropFilter="blur(4px)" />
          <Drawer.Positioner>
            <Drawer.Content
              bg="gray.950"
              borderLeft="1px solid"
              borderColor="whiteAlpha.100"
              maxW="280px"
            >
              <Drawer.Header
                borderBottom="1px solid"
                borderColor="whiteAlpha.100"
                py={4}
                px={6}
              >
                <Flex align="center" justify="space-between">
                  <HStack gap={2}>
                    <Flex
                      w="30px"
                      h="30px"
                      align="center"
                      justify="center"
                      borderRadius="md"
                      bg="violet.500"
                      fontSize="xs"
                      fontWeight="bold"
                      color="white"
                    >
                      MN
                    </Flex>
                    <Text fontSize="sm" fontWeight="semibold" color="white">
                      Martin Nagy
                    </Text>
                  </HStack>
                  <CloseButton
                    color="gray.400"
                    _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
                    onClick={() => setMobileOpen(false)}
                  />
                </Flex>
              </Drawer.Header>

              <Drawer.Body px={4} py={6}>
                <VStack align="stretch" gap={1}>
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      px={4}
                      py={3}
                      borderRadius="lg"
                      fontSize="sm"
                      fontWeight="medium"
                      color="gray.300"
                      transition="color 0.15s, background 0.15s"
                      _hover={{ color: 'white', bg: 'whiteAlpha.100', textDecoration: 'none' }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </VStack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  )
}
