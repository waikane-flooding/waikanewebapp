import './App.css';
import WaiaholeStreamHeight from './components/WaiaholeStreamHeight';
import WaikaneStreamHeight from './components/WaikaneStreamHeight';
import WaikaneTideLevel from './components/WaikaneTideLevel';
import WaikaneStreamGraph from './components/WaikaneStreamGraph';
import WaiaholeStreamGraph from './components/WaiaholeStreamGraph';
import WaikaneTideGraph from './components/WaikaneTideGraph';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Waikane Flood Visualization</h1>
        
        {/* All Components in Vertical Order */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '30px', 
          width: '100%', 
          maxWidth: '1200px', 
          margin: '0 auto',
          padding: '20px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <WaiaholeStreamHeight />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <WaiaholeStreamGraph />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <WaikaneStreamHeight />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <WaikaneStreamGraph />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <WaikaneTideLevel />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <WaikaneTideGraph />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
