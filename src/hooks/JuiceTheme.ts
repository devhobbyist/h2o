import type { ThemeContextType } from 'contexts/themeContext'

import { useEffect, useState } from 'react'

import { juiceTheme } from 'constants/theme'
import { ThemeOption } from 'constants/theme/theme-option'

const flattenNestedObject = (
  nestedObj: Record<string, any>,
  prefix?: string,
): Record<string, string> =>
  Object.keys(nestedObj).reduce((acc, key) => {
    const name = prefix ? prefix + '-' + key : key
    return {
      ...acc,
      ...(typeof nestedObj[key] === 'string'
        ? { [name]: nestedObj[key] }
        : flattenNestedObject(nestedObj[key], name)),
    }
  }, {})

export function useJuiceTheme(
  storageKey: string = 'jb_theme',
): ThemeContextType {
  const initialThemeOption =
    // 获取本地主题 默认为黑夜主题
    (localStorage.getItem(storageKey) as ThemeOption) || ThemeOption.dark

  const [currentThemeOption, setCurrentThemeOption] =
    useState<ThemeOption>(initialThemeOption)

  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    initialThemeOption === ThemeOption.dark,
  )

  const setRootVarsForThemeOption = (themeOption: ThemeOption) => {
    Object.entries(flattenNestedObject(juiceTheme(themeOption).colors)).forEach(
      ([key, value]) =>
        document.documentElement.style.setProperty('--' + key, value),
    )

    Object.entries(juiceTheme(themeOption).radii).forEach(([key, value]) => {
      if (!value) return
      document.documentElement.style.setProperty(
        '--radius-' + key,
        value.toString(),
      )
    })
  }

  useEffect(
    () => setRootVarsForThemeOption(initialThemeOption),
    [initialThemeOption],
  )

  useEffect(
    () => setIsDarkMode(currentThemeOption === ThemeOption.dark),
    [currentThemeOption],
  )

  return {
    themeOption: currentThemeOption,
    theme: juiceTheme(currentThemeOption),
    isDarkMode: isDarkMode,
    forThemeOption: map => map[currentThemeOption],
    setThemeOption: (themeOption: ThemeOption) => {
      setRootVarsForThemeOption(themeOption)
      setCurrentThemeOption(themeOption)
      localStorage.setItem(storageKey, themeOption)
    },
  }
}
