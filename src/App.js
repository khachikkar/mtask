import Header from './components/global/Header';
import Login from './pages/login';
import Register from './pages/register';
import './styles/global.css';

import { Flex } from 'antd';

const App = () => {
    return (
        <div id="divContainer">
          <Header />

<Flex wrap  direction="column" align="flex-start" gap="middle" justify="center" >

<Register />
<Login />

</Flex>


<div className='logpass'>

</div>


        </div>
    )
};

export default App;


