import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [dispositivi, setDispositivi] = useState([]);
    const [isMouseInMainArea, setIsMouseInMainArea] = useState(false);
    const [isMouseInBathroom, setIsMouseInBathroom] = useState(false);

    useEffect(() => {
        fetchDispositivi();
    }, []);

    const fetchDispositivi = async () => {
        try {
            const response = await axios.get('http://localhost:3001/dispositivi');
            setDispositivi(response.data);
        } catch (error) {
            console.error('Errore:', error);
        }
    };

    const handleAccendi = async (id) => {
        try {
            await axios.post(`http://localhost:3001/accendi/${id}`);
            fetchDispositivi();
        } catch (error) {
            console.error('Errore:', error);
        }
    };

    const handleSpegni = async (id) => {
        try {
            await axios.post(`http://localhost:3001/spegni/${id}`);
            fetchDispositivi();
        } catch (error) {
            console.error('Errore:', error);
        }
    };

    const handleMouseEnterMain = async () => {
        try {
            setIsMouseInMainArea(true);
            for (const dispositivo of dispositivi.filter(d => d.categoria === 'STANZA PRINCIPALE')) {
                await axios.post(`http://localhost:3001/accendi/${dispositivo.id}`);
            }
            fetchDispositivi();
        } catch (error) {
            console.error('Errore:', error);
        }
    };

    const handleMouseLeaveMain = async () => {
        try {
            setIsMouseInMainArea(false);
            for (const dispositivo of dispositivi.filter(d => d.categoria === 'STANZA PRINCIPALE')) {
                await axios.post(`http://localhost:3001/spegni/${dispositivo.id}`);
            }
            fetchDispositivi();
        } catch (error) {
            console.error('Errore:', error);
        }
    };

    const handleMouseEnterBathroom = async () => {
        try {
            setIsMouseInBathroom(true);
            const bathroomLuce = dispositivi.find(d => d.categoria === 'BATHROOM' && d.nome === 'Luce');
            if (bathroomLuce) {
                await axios.post(`http://localhost:3001/accendi/${bathroomLuce.id}`);
                fetchDispositivi();
            }
        } catch (error) {
            console.error('Errore:', error);
        }
    };

    const handleMouseLeaveBathroom = async () => {
        try {
            setIsMouseInBathroom(false);
            const bathroomLuce = dispositivi.find(d => d.categoria === 'BATHROOM' && d.nome === 'Luce');
            if (bathroomLuce) {
                await axios.post(`http://localhost:3001/spegni/${bathroomLuce.id}`);
                fetchDispositivi();
            }
        } catch (error) {
            console.error('Errore:', error);
        }
    };

    return (
        <div className="App">
            <h1>ALTEREGO</h1>
            <div className="main-content">
                <div
                    id="controlArea"
                    onMouseEnter={handleMouseEnterMain}
                    onMouseLeave={handleMouseLeaveMain}
                >
                    <div
                        id="bathroom"
                        onMouseEnter={handleMouseEnterBathroom}
                        onMouseLeave={handleMouseLeaveBathroom}
                    ></div>
                </div>
                <ul>
                  <h3>Dispositivi Main</h3>
                    {dispositivi.filter(dispositivo => dispositivo.categoria === 'STANZA PRINCIPALE').map(dispositivo => (
                        <li key={dispositivo.id}>
                            {dispositivo.nome} - {dispositivo.acceso ? 'Acceso' : 'Spento'}
                            <button onClick={() => handleAccendi(dispositivo.id)}>Accendi</button>
                            <button onClick={() => handleSpegni(dispositivo.id)}>Spegni</button>
                        </li>
                    ))}
                    <h3>Dispositivi Bathroom</h3>
                    {dispositivi.filter(dispositivo => dispositivo.categoria === 'BATHROOM').map(dispositivo => (
                        <li key={dispositivo.id}>
                            {dispositivo.nome} - {dispositivo.acceso ? 'Acceso' : 'Spento'}
                            <button onClick={() => handleAccendi(dispositivo.id)}>Accendi</button>
                            <button onClick={() => handleSpegni(dispositivo.id)}>Spegni</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
