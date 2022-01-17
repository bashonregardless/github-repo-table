import './App.css';
import Form from './components-to-test-in-isolation/component-using-formik.js';

function App() {
  return (
    <div className="App">
      <Form onSubmit={() => console.log("on Submit")}/>
    </div>
  );
}

export default App;
