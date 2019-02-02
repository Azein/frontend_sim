import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import * as theme from 'ui/theme'
import { Layout } from './ui/components/Layout'
import GameScene from './scenes/GameScene/index'

const App = () => (
  <Router>
    <Layout>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={() => <GameScene />} />
        </Switch>
      </ThemeProvider>
    </Layout>
  </Router>
)

export default App
