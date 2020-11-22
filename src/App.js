import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Home from 'pages/Home';

import './App.scss';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Home />
      </Container>
    </>
  );
}

export default App;
