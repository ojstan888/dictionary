import React, { useEffect, useState, useRef } from 'react'

export function useSearchInputState(searchHandler: () => void) {
  const didMountRef = useRef(false)

  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    let delayDebounceFn: any

    if (didMountRef.current) {
      delayDebounceFn = setTimeout(searchHandler, 600)
    } else {
      didMountRef.current = true
    }

    return () => clearTimeout(delayDebounceFn)
  }, [searchValue])

  return [searchValue, setSearchValue] as const
}
