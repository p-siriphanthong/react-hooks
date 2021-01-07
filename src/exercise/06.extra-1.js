// useEffect: HTTP requests
// 💯 handle errors
// http://localhost:3000/isolated/exercise/06.extra-1.js

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
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!pokemonName) return

    setPokemon(null)
    setError(null)

    // 💬 or using second parameter of `then` to set the error
    fetchPokemon(pokemonName).then(setPokemon).catch(setError)
  }, [pokemonName])

  if (!pokemonName) return 'Submit a pokemon'
  if (error) return <ErrorFallback error={error} />
  if (!pokemon) return <PokemonInfoFallback name={pokemonName} />
  return <PokemonDataView pokemon={pokemon} />
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
