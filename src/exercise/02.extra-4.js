// useEffect: persistent state
// 💯 flexible localStorage hook
// http://localhost:3000/isolated/exercise/02.extra-4.js

import React from 'react'

function useLocalStorageState(
  key,
  defaultValue = '',
  // 💬 add options prop like `{serialize = JSON.stringify, deserialize = JSON.parse} = {}`,
) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName
  const [value, setValue] = React.useState(
    () => getLocalStorageValue() || defaultValue, // 💬 if defaultValue is a function should call `defaultValue()`
  )

  function getLocalStorageValue() {
    try {
      return JSON.parse(window.localStorage.getItem(key))
    } catch (error) {
      // 💬 maybe remove item from local storage
      return window.localStorage.getItem(key)
    }
  }

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  React.useEffect(() => {
    // 💬 maybe remove item from local storage when key changed
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
