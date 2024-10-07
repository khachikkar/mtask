import Header from './components/global/Header';
import Login from './pages/login';
import Register from './pages/register';
import './styles/global.css';

const App = () => {
    return (
        <div id="divContainer">
          <Header />
          
<div className='logpass'>
<Register />
<Login />
</div>


        </div>
    )
};

export default App;


