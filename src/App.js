import 'reactflow/dist/style.css';
import "./App.css"
import CustomNode from './components/CustomNode';
import { ReactFlowProvider } from 'reactflow';

function App() {
 
  return (
      <ReactFlowProvider>
        <CustomNode/>
      </ReactFlowProvider>
    
  );
}

export default App;
