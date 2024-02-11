"use client"

import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react"

export interface AppContext {
  currentLanguage: string
  setCurrentLanguage: Dispatch<SetStateAction<string>>
  showLanguageSelector: boolean
  setShowLanguageSelector: Dispatch<SetStateAction<boolean>>
  reduceMotion: boolean
  setReduceMotion: Dispatch<SetStateAction<boolean>>
}

const defaultValues: AppContext = {
  currentLanguage: "en",
  showLanguageSelector: false,
  reduceMotion: false,
  setCurrentLanguage: () => undefined,
  setReduceMotion: () => undefined,
  setShowLanguageSelector: () => undefined,
}

export const AppContext = React.createContext(defaultValues)
export const useAppContext = () => useContext(AppContext)

export type AppContextProviderProps = {
  currentLanguage: string
  showLanguageSelector: boolean
  reduceMotion: boolean
}

const AppContextProvider: React.FC<
  PropsWithChildren<AppContextProviderProps>
> = ({ children, ...props }) => {
  const [currentLanguage, setCurrentLanguage] = useState(props.currentLanguage)
  const [showLanguageSelector, setShowLanguageSelector] = useState(
    props.showLanguageSelector
  )
  const [reduceMotion, setReduceMotion] = useState(props.reduceMotion)

  return (
    <AppContext.Provider
      value={{
        ...props,
        currentLanguage,
        setCurrentLanguage,
        showLanguageSelector,
        setShowLanguageSelector,
        reduceMotion,
        setReduceMotion,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
