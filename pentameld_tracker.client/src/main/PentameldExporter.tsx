import { useEffect, useState } from 'react';
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
        if (gear || melds) {
            UpdateView()
        }
    }, [gear, melds]);


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
        const response = await fetch(`pentameldgearexporter/export`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gear, melds }),
        });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${name}.json`;
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
        console.log("gearPiece.id")
        console.log(gearPiece.id)
        console.log("response")
        console.log(gearPiece)
        setGear([...gear, gearPiece]);

        const materiaToMeld = []
        const materiaElements = [];

        for (let i = 0; i < 5; i++)
        {
            console.log("materia gearPiece.id")
            console.log(gearPiece.id)
            const response = await fetch(`records/createMateria?&gearId=${gearPiece.id}&meldSlot=${i}&gearMeldType=${gearPiece.meldType}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
            const materia = await response.json();
            const newMateria =
                <div>
                    <select
                        id={materia.id}
                        value={materia.materiaType}
                        onChange={(e) => { materia.materiaType = parseInt(e.target.value) }}>
                        <option value="0" >Control</option>
                        <option value="1" >Craftsmanship</option>
                        <option value="2" >CP</option>
                    </select>
                </div>;

            materiaElements.push(newMateria);
            materiaToMeld.push(materia as Materia)
        }

        setMelds([...melds, materiaToMeld]);

    }

    async function UpdateView()
    {
        const displayedGearWithMateria = gear.map((gearPiece, index) => (
            <div key={gearPiece.id} style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <select
                    value={gearPiece.slot}
                    onChange={(e) => {
                        const updatedGear = { ...gearPiece, slot: parseInt(e.target.value) };
                        const updatedList = [...gear];
                        updatedList[index] = updatedGear;
                        setGear(updatedList);
                    }}
                >
                    <option value="0">MainHand</option>
                    <option value="1">OffHand</option>
                    <option value="2">Head</option>
                    <option value="3">Body</option>
                    <option value="4">Gloves</option>
                    <option value="5">Legs</option>
                    <option value="6">Feet</option>
                    <option value="7">Earring</option>
                    <option value="8">Necklace</option>
                    <option value="9">Bracelet</option>
                    <option value="10">Ring</option>
                </select>


                {melds[index]?.map((innerMateria, materiaIndex) => (
                    <select
                        key={innerMateria.id}
                        value={innerMateria.materiaType}
                        onChange={(e) => {
                            const updatedMat = { ...innerMateria, materiaType: parseInt(e.target.value) };
                            const updatedList = [...melds];
                            updatedList[index][materiaIndex] = updatedMat;
                            setMelds(updatedList);
                        }}
                    >
                        <option value="0">Control</option>
                        <option value="1">Craftsmanship</option>
                        <option value="2">CP</option>
                    </select>
                ))}
            </div>
        ));

        setGearDisplay(displayedGearWithMateria);

    }
}

export default PentameldExporter;
