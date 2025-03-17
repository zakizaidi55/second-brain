import { useState } from 'react'
import './App.css'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { CreateContentModal } from './components/CreateContentModal'
import { PlusIcon } from './Icons/PlusIcon'
import { ShareIcon } from './Icons/ShareIcon'
import { Sidebar } from './components/Sidebar'

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <Sidebar/>
      <div className='p-4 ml-72 min-h-screen bg-gray-200'>
        <CreateContentModal open={modalOpen} onClose={()=> setModalOpen(false)} />
        <div className='max-w-screen w-11/12  flex justify-end gap-x-2 mt-3'>
          <Button onClick={()=> setModalOpen(true)} variant="primary" text="Add Content" startIcon={<PlusIcon/>}/>
          <Button variant="secondary" text="Share Barain" startIcon={<ShareIcon/> }/>
        </div>
      </div>
      {/* <Card/> */}
    </div>
  )
}

export default App
