// useEffect: HTTP requests
// 💯 re-mount the error boundary
// http://localhost:3000/isolated/exercise/06.extra-5.js

import React from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {error: null}
  }

  static getDerivedStateFromError(error) {
    return {error}
  }

  render() {
    if (this.state.error) {
      return (
        <div role="alert">
          There was an error:{' '}
          <pre style={{whiteSpace: 'normal'}}>{this.state.error.message}</pre>
        </div>
      )
    }

    return this.props.children
  }
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({status: 'idle'})

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
  if (isRejected) throw state.error
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
        <ErrorBoundary key={pokemonName}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
