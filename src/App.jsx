import { useState } from 'react'
import NavBar from './components/NavBar'
import BriefTab from './tabs/BriefTab'
import SOAPTab from './tabs/SOAPTab'
import AnchorTab from './tabs/AnchorTab'
import BodyTab from './tabs/BodyTab'
import MenuTab from './tabs/MenuTab'
import CaptureTab from './tabs/CaptureTab'

const LINEN = '#F5F0E8'

function renderTab(active) {
  switch (active) {
    case 'brief':   return <BriefTab />
    case 'soap':    return <SOAPTab />
    case 'anchor':  return <AnchorTab />
    case 'body':    return <BodyTab />
    case 'menu':    return <MenuTab />
    case 'capture': return <CaptureTab />
    default:        return null
  }
}

export default function App() {
  const [active, setActive] = useState('anchor')

  return (
    <div style={{ background: LINEN, minHeight: '100vh' }}>
      {renderTab(active)}
      <NavBar active={active} setActive={setActive} />
    </div>
  )
}
