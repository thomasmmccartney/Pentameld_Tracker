import { useEffect, useState } from 'react';
import './App.css';

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

function App() {
    const [gear, setGear] = useState<Gear[]>();
    const [materia, setMateria] = useState<Materia[]>();
    const [gearLoaded, setGearLoaded] = useState(false);

    useEffect(() => {
        const fetchGear = async () => {
            console.log("StartedGear")
            await populateGear(); // assume this returns gear data
            console.log("FinishedGear")
        };
        fetchGear();
    }, []);

    useEffect(() => {
        if (gearLoaded && gear != null && gear.length > 0) {
            console.log("StartedMateria")
            populateMateria(gear);
            console.log("FinishedMateria")
        }
    }, [gearLoaded, gear]);

    const gearContents = gear === undefined || materia === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <div>{gear.map(gearPiece => {
            return (
                <div key={gearPiece.id}>
                <h1>{gearPiece.slotString}</h1>
                <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Meld Slot</th>
                        <th>Materia Type</th>
                        <th>Average Melds</th>
                    </tr>
                </thead>
                <tbody>
                  {materia
                      .filter(materiaToMeld => materiaToMeld.gearId == gearPiece.id)
                       .map(materiaToMeld => {
                        return (
                            <tr key={materiaToMeld.id}>
                                <td>{materiaToMeld.meldSlot}</td>
                                <td>{materiaToMeld.materiaTypeString}</td>
                                <td>{materiaToMeld.averageNumberOfMelds}</td>
                            </tr>
                        );
                    })}
                </tbody>
                </table>
            </div>
        )})}
        </div>;

    const materiaContents = gear === undefined || materia === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <div>
            <h1>Total Melds</h1>
            <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                    <tr>
                        <th>Control</th>
                        <th>Craftsmanship</th>
                        <th>CP</th>
                </tr>
            </thead>
            <tbody>
             <tr>
                        <td>{materia.filter(item => item.materiaType == 0).reduce((sum, item) => sum + item.averageNumberOfMelds, 0)}</td>
              <td>{materia.filter(item => item.materiaType == 1).reduce((sum, item) => sum + item.averageNumberOfMelds, 0)}</td>
                        <td>{materia.filter(item => item.materiaType == 2).reduce((sum, item) => sum + item.averageNumberOfMelds, 0)}</td>
             </tr>
            </tbody>
            </table>
        </div>;

    return (
        <div>
            <h1 id="tableLabel">Gear</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {gearContents}
            {materiaContents}
        </div>
    );

    async function populateGear() {
        const response = await fetch('pentameldgearprobability');
        if (response.ok) {
            const data = await response.json();
            setGear(data);
            setGearLoaded(true);
        }
    }

async function populateMateria(gear: Gear[]) {
    const fetches = gear.map(async gearPiece => {
        const response = await fetch(
            `pentameldmateriaprobability?meldType=${gearPiece.meldType}&gearId=${gearPiece.id}`
        );

        if (response.ok) {
            const data = await response.json();
            return data as Materia[];
        } else {
            return [];
        }
    });

    const results = await Promise.all(fetches);
    const materiaToAdd = results.flat(); // flatten array of arrays
    setMateria(materiaToAdd);
}

}

export default App;