import './App.css'
import { Button } from './components/ui/Button'
import { PlusIcon } from './Icons/PlusIcon'

function App() {
  return (
    <div>
      <Button  variant="primary" text="Share" size="sm"/>
      <Button variant="secondary" text="Share" size="md"/>
      <Button variant="primary" text="Share" size="lg"/>
    </div>
  )
}

export default App
