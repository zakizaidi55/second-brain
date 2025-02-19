import './App.css'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { PlusIcon } from './Icons/PlusIcon'
import { ShareIcon } from './Icons/ShareIcon'

function App() {
  return (
    <div>
      <div className='max-w-screen w-11/12  flex justify-end gap-x-2 mt-3'>
        <Button variant="primary" text="Add Content" startIcon={<PlusIcon/>}/>
        <Button variant="secondary" text="Share Barain" startIcon={<ShareIcon/> }/>
      </div>
      <Card/>
    </div>
  )
}

export default App
