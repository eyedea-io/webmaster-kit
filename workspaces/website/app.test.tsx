import * as React from 'react'
import * as ReactShallowRenderer from 'react-test-renderer/shallow'
import App from './app'

describe('<App />', () => {
  const renderer = ReactShallowRenderer.createRenderer()

  it('renders', () => {
    expect(renderer.render(<App />)).toMatchSnapshot()
  })
})
