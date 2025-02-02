import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../final/04.extra-3'

test('can play a game of tic tac toe', () => {
  render(<App />)
  // prettier-ignore
  const [
    s1, s2, s3,
    s4, s5, s6,
    s7, s8, s9 // eslint-disable-line no-unused-vars
  ] = Array.from(screen.queryAllByRole('button'))
  expect(screen.getByText('Next player: X')).toBeInTheDocument()
  const gameStart = screen.getByText(/go to game start/i)
  expect(gameStart).toHaveAttribute('disabled')
  expect(gameStart).toHaveTextContent('current')

  userEvent.click(s1)
  expect(s1).toHaveTextContent('X')

  expect(screen.getByText('Next player: O')).toBeInTheDocument()
  const firstMove = screen.getByText(/go to move #1/i)
  expect(gameStart).not.toHaveAttribute('disabled')
  expect(gameStart).not.toHaveTextContent('current')
  expect(firstMove).toHaveAttribute('disabled')
  expect(firstMove).toHaveTextContent('current')

  userEvent.click(s5)
  expect(s5).toHaveTextContent('O')
  const secondMove = screen.getByText(/go to move #2/i)
  expect(gameStart).not.toHaveAttribute('disabled')
  expect(gameStart).not.toHaveTextContent('current')
  expect(firstMove).not.toHaveAttribute('disabled')
  expect(firstMove).not.toHaveTextContent('current')
  expect(secondMove).toHaveAttribute('disabled')
  expect(secondMove).toHaveTextContent('current')

  userEvent.click(firstMove)
  expect(gameStart).not.toHaveAttribute('disabled')
  expect(gameStart).not.toHaveTextContent('current')
  expect(firstMove).toHaveAttribute('disabled')
  expect(firstMove).toHaveTextContent('current')
  expect(secondMove).not.toHaveAttribute('disabled')
  expect(secondMove).not.toHaveTextContent('current')
  expect(s5).not.toHaveTextContent('O')

  // prettier-ignore
  expect(
      JSON.parse(window.localStorage.getItem('tic-tac-toe:history')),
      'Make sure that the localStorage item is updated with the JSON.stringified squares array',
  ).toEqual([
    [null, null, null,
     null, null, null,
     null, null, null],
    ['X',  null, null,
     null, null, null,
     null, null, null],
    ['X',  null, null,
     null, 'O',  null,
     null, null, null]
  ])

  userEvent.click(gameStart)
  expect(s1).toHaveTextContent('')
  expect(s5).toHaveTextContent('')
  expect(screen.queryAllByRole('listitem').length).toBe(3)

  userEvent.click(screen.getByText('restart'))
  expect(s1).toHaveTextContent('')
  expect(s5).toHaveTextContent('')
  expect(screen.queryAllByRole('listitem').length).toBe(1)

  // prettier-ignore
  expect(
      JSON.parse(window.localStorage.getItem('tic-tac-toe:history')),
      'Make sure that the localStorage item is updated with the JSON.stringified squares array',
  ).toEqual([
    [null, null, null,
     null, null, null,
     null, null, null]
  ])
})
