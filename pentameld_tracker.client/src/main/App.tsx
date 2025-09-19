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
        : <div>
                <h1>Gear</h1>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Gear Piece</th>
                        <th>Meld 1</th>
                         <th>Meld 2</th>
                         <th>Meld 3</th>
                         <th>Meld 4</th>
                         <th>Meld 5</th>
                    </tr>
                </thead>
                        <tbody>{gear.map(gearPiece => {
                            return (
                                <tr>
                                    <td>{gearPiece.slotString}</td>
                                    {materia
                                    .filter(materiaToMeld => materiaToMeld.gearId == gearPiece.id)
                                    .map(materiaToMeld => {
                                        return (<td>{materiaToMeld.materiaTypeString}</td>);
                                    })}</tr>
                            )
                        })}
                
                </tbody>
                        </table>
                </div>
            </div>;

    const materiaContents = gear === undefined || materia === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <div>
            <h1>Total Melds</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                        <tr>
                            <th>Type</th>
                        <th>Control</th>
                        <th>Craftsmanship</th>
                        <th>CP</th>
                </tr>
            </thead>
            <tbody>
                        <tr>
                        <td>XII</td>
                            <td>{materia.filter(item => item.materiaType == 0 && (item.averageNumberOfMelds == 1 || item.averageNumberOfMelds == 6)).reduce((sum, item) => sum + item.averageNumberOfMelds, 0)}</td>
                            <td>{materia.filter(item => item.materiaType == 1 && (item.averageNumberOfMelds == 1 || item.averageNumberOfMelds == 6)).reduce((sum, item) => sum + item.averageNumberOfMelds, 0)}</td>
                            <td>{materia.filter(item => item.materiaType == 2 && (item.averageNumberOfMelds == 1 || item.averageNumberOfMelds == 6)) .reduce((sum, item) => sum + item.averageNumberOfMelds, 0)}</td>
                        </tr>
                        <tr>
                            <td>XI</td>
                            <td>{materia.filter(item => item.materiaType == 0 && item.averageNumberOfMelds != 1 && item.averageNumberOfMelds != 6).reduce((sum, item) => sum + item.averageNumberOfMelds, 0)}</td>
                            <td>{materia.filter(item => item.materiaType == 1 && item.averageNumberOfMelds != 1 && item.averageNumberOfMelds != 6).reduce((sum, item) => sum + item.averageNumberOfMelds, 0)}</td>
                            <td>{materia.filter(item => item.materiaType == 2 && item.averageNumberOfMelds != 1 && item.averageNumberOfMelds != 6).reduce((sum, item) => sum + item.averageNumberOfMelds, 0)}</td>
                        </tr>
            </tbody>
                </table>
            </div>
        </div>;

    return (
        <div>
            <h1 id="tableLabel">Pentamelding Tracker</h1>
            <p>Shows the required Melds for gear.</p>
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