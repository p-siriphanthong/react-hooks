// useEffect: HTTP requests
// 💯 store the state in an object
// http://localhost:3000/isolated/exercise/06.extra-3.js

import React from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function ErrorFallback({error}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({status: 'idle'})
  // 💬 destructure state: `const {status, pokemon, error} = state`

  const isIdle = state.status === 'idle'
  const isPending = state.status === 'pending'
  const isResolved = state.status === 'resolved'
  const isRejected = state.status === 'rejected'

  React.useEffect(() => {
    if (!pokemonName) return

    setState({status: 'pending'})
    fetchPokemon(pokemonName)
      .then(pokemon => setState({status: 'resolved', pokemon}))
      .catch(error => setState({status: 'rejected', error}))
  }, [pokemonName])

  if (isIdle) return 'Submit a pokemon'
  if (isPending) return <PokemonInfoFallback name={pokemonName} />
  if (isResolved) return <PokemonDataView pokemon={state.pokemon} />
  if (isRejected) return <ErrorFallback error={state.error} />
  return null
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
