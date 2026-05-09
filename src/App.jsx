import { useState, Component } from 'react'
import NavBar from './components/NavBar'
import BriefTab from './tabs/BriefTab'
import SOAPTab from './tabs/SOAPTab'
import AnchorTab from './tabs/AnchorTab'
import BodyTab from './tabs/BodyTab'
import MenuTab from './tabs/MenuTab'
import CaptureTab from './tabs/CaptureTab'

const LINEN = '#F5F0E8'
const MUTED = '#78716C'

class TabErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error: error.message || 'Unknown error' }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.tab !== this.props.tab) this.setState({ error: null })
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 28px' }}>
          <p style={{ fontSize: 13, color: MUTED, fontFamily: 'system-ui, sans-serif', textAlign: 'center', lineHeight: 1.6 }}>
            Something went wrong loading this tab.{'\n'}{this.state.error}
          </p>
        </div>
      )
    }
    return this.props.children
  }
}

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
      <TabErrorBoundary tab={active}>
        {renderTab(active)}
      </TabErrorBoundary>
      <NavBar active={active} setActive={setActive} />
    </div>
  )
}
