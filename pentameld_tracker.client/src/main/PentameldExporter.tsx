import { useEffect, useState, type ChangeEvent } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import type { JSX } from 'react/jsx-dev-runtime';

interface Gear {
    id: string;
    slotString: string;
    meldTypeString: string;
    slot: number;
    meldType: number;
}
interface Materia {
    id: string;
    gearId: string;
    meldSlot: string;
    materiaTypeString: string;
    materiaType: number;
    averageNumberOfMelds: number;
}

function PentameldExporter() {
    const [gear, setGear] = useState<Gear[]>([]);
    const [melds, setMelds] = useState<Materia[][]>([]);
    const [name, setName] = useState("MyMelds");
    const [gearDisplay, setGearDisplay] = useState<JSX.Element[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
    }, []);

    return (
        <div>
            <div style={{
                textAlign: 'center', marginTop: '10px'}}>
            <button onClick={() => navigate('/')}>
                Go to Home Page
            </button>
            </div>
            <button onClick={() => exportGear()}>
                Export Gear
            </button>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
            <label htmlFor="gear-select">Choose gear type:</label>
            {gearDisplay}
            <button onClick={() => createNewGear()}>
               +
            </button>
        </div>
    );

    async function exportGear() {
        const response = await fetch(`pentameldgearexporter/export?gear=${gear}&melds=${melds}`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    async function createNewGear() {

        const response = await fetch('records/createGear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
        const gearPiece = await response.json();

        const newGear =
            <div>
                <select
                    id={gearPiece.id}
                    value={gearPiece.slot}
                    onChange={(e) => gearPiece.slot = parseInt(e.target.value)}>
                    <option value="0" >MainHand</option>
                    <option value="1" >OffHand</option>
                    <option value="2" >Head</option>
                    <option value="3" >Body</option>
                    <option value="4" >Gloves</option>
                    <option value="5" >Legs</option>
                    <option value="6" >Feet</option>
                    <option value="7" >Earring</option>
                    <option value="8" >Necklace</option>
                    <option value="9" >Bracelet</option>
                    <option value="10" >Ring</option>
                </select>
            </div>;

        console.log("newGear")
        console.log(newGear)

        setGearDisplay([...gearDisplay, newGear]);
        setGear([...gear, gearPiece]);

        const materiaToMeld = []
        const materiaElements = [];

        for (let i = 0; i < 5; i++)
        {
            const response = await fetch(`records/createMateria?&gearId=${gearPiece.id}&meldSlot=${i}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
            console.log(response)
            const materia = await response.json();
            const newMateria =
                <div>
                    <select
                        id={materia.id}
                        value={materia.materiaType}
                        onChange={(e) => {materia.materiaType = parseInt(e.target.value)}}>
                        <option value="0" >Control</option>
                        <option value="1" >Craftsmanship</option>
                        <option value="2" >CP</option>
                    </select>
                </div>;

            materiaElements.push(newMateria);
            materiaToMeld.push(materia as Materia)
            console.log("newMateria")
            console.log(newMateria)
        }

        setGearDisplay([...gearDisplay, newGear, ...materiaElements]);
        setMelds([...melds, materiaToMeld]);
    }
}

export default PentameldExporter;
