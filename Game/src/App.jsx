import { useState } from 'react'
import ReactDOM from 'react-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import ErrorBoundary from './ErrorBoundary';
import QuizApp from './Component/QuizApp';


function App() {
  return(
    <ErrorBoundary>
    <QuizApp />
  </ErrorBoundary>
  )
}

export default App;


