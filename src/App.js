import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@/styled-components'
import * as theme from '@/styled-components/theme'
import { Layout } from './ui/components/Layout'
import GameScene from '@/views/GameScene/index'

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
