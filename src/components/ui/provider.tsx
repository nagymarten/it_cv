"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import { EmotionStyleRegistry } from "./EmotionStyleRegistry"

export function Provider(props: ColorModeProviderProps) {
  return (
    <EmotionStyleRegistry>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider {...props} />
      </ChakraProvider>
    </EmotionStyleRegistry>
  )
}
