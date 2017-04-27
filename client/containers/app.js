import Nav from '../components/nav';
import Footer from '../components/footer';

const App = ({ children }) => (
  <div id="app">
    <Nav/>
    <section id="main" className="section">
      {children}
    </section>
    <Footer/>
  </div>
);

export default App;
