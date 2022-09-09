import React, {useEffect} from 'react'; 
// Import Router components
import { Route, Routes, Navigate } from 'react-router-dom';
// Import Redux components
import { useDispatch } from 'react-redux'; 

// Import Components 
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js'; 
import Plants from './components/Plants/Plants.js';
import FormAddPlant from './components/Plants/FormAddPlant.js'; 
import PlantCard from './components/Plants/PlantCard.js';
import Pots from './components/Pots/Pots.js';
import Other from './components/Other/Other.js';
import NotFound from './components/Errors/NotFound'
// Import material UI

const App = () => {

    return(
        <div>
            <Navbar />
            <div>
                <Routes>
                    <Route path='home' element={<Home />}/>
                    <Route path='plants' element={<Plants />} />
                    <Route path='add-plant' element={<FormAddPlant />} />
                    <Route path='plant-details/:sectionId/:id' element={<PlantCard />} />
                    <Route path='pots' element={<Pots />} />
                    <Route path='other' element={<Other />} />
                    <Route path='/' element={<Navigate to='home'/>} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
        </div>
      
    )
}

export default App; 