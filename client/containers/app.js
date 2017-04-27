import Nav from '../components/nav';
import Footer from '../components/footer';

const App = ({ children }) => (
  <div id="app">
    <Nav/>
    <section id="main">
      {children}
    </section>
    <Footer/>
  </div>
);

export default App;
