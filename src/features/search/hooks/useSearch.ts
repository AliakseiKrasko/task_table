import { useState, useMemo, useEffect } from 'react'
import { debounce } from 'lodash'

export function useSearch(delay = 300) {
  const [searchText, setSearchText] = useState('')
  const [inputValue, setInputValue] = useState('')

  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        setSearchText(val)
      }, delay),
    [delay]
  )

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  const handleChange = (val: string) => {
    setInputValue(val)
    debouncedSearch(val)
  }

  return {
    searchText,
    inputValue,
    handleChange,
  }
}
