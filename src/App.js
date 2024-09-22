import 'bootstrap/dist/js/bootstrap.js';
import 'bootswatch/dist/slate/bootstrap.min.css';

import WordleMainComponent from './components/WordleMainComponent';
import Header from './components/Header';


function App() {
  


  return (
    <div className="App">
      <Header />
      <WordleMainComponent />
    </div>
  );
}

export default App;
