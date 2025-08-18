import MessageContainer from './components/MessageContainer/MessageContainer';
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import MainRouter from './routers/MainRouter/MainRouter';
import './styles/global.css';
import './styles/theme.css';

function App() {
  return (
    <TaskContextProvider>
      <MessageContainer>
        <MainRouter />
      </MessageContainer>
    </TaskContextProvider>
  );
}

export default App;
