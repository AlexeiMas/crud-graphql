import React, {useState} from "react"

type TUseSearch = {
  defaultValue: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }) => void
}

export const useSearch = (): TUseSearch => {
  const [search, setSearch] = useState<string>('')

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => e.target.value === '' && setSearch(e.target.value)
  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }) => e.key === 'Enter' && setSearch(e.target.value)

  return {
    defaultValue: search,
    onChange: onChangeHandler,
    onKeyDown: onKeyDownHandler
  }
}