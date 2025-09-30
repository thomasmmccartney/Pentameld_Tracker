import { useEffect, useState, type SetStateAction } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

interface Gear {
    Id: string;
    SlotString: string;
    MeldTypeString: string;
    Slot: number;
    MeldType: number;
}
interface Materia {
    Id: string;
    GearId: string;
    MeldSlot: string;
    MateriaTypeString: string;
    MateriaType: number;
    AverageNumberOfMelds: number;
}

function PentameldCalculator() {
    const [gear, setGear] = useState<Gear[]>([]);
    const [materia, setMateria] = useState<Materia[]>([]);
    const [fileError, setFileError] = useState<string | null>(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    const navigate = useNavigate();

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/json') {
            setFileError('Please select a valid JSON file.');
            return;
        }

        try {
            const text = await file.text();
            const json = JSON.parse(text);

            const gearList = json.map(item => item.Gear);
            const materiaList = json.flatMap(item => item.Melds);

            setGear(gearList);
            setMateria(materiaList);
            setFileError(null);
            setDataLoaded(true);

        } catch (error) {
            console.error('Error importing JSON:', error);
            setFileError('Failed to read or send JSON file.');
        }
    };

    return (
        <div>
            <div style={{
                textAlign: 'center', marginTop: '10px'
            }}>
                <button onClick={() => navigate('/')}>
                    Go to Home Page
                </button>
            </div>
            {!dataLoaded
                ?
                <div>
                    <input type="file" accept=".json" onChange={handleFileChange} />
                    {fileError && <p style={{ color: 'red' }}>{fileError}</p>}
                </div>
                :
                <div>
                    <h1 id="tableLabel">Pentamelding Tracker</h1>
                    <p>Shows the required Melds for gear.</p>
                    <div>
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
                                <tbody>{
                                    gear.map(
                                        gearPiece => {
                                            return (
                                                <tr key={gearPiece.Id}>
                                                    <td>{gearPiece.SlotString}
                                                    </td> {
                                                        materia.filter(
                                                            materiaToMeld =>
                                                                materiaToMeld.GearId == gearPiece.Id)
                                                            .map(materiaToMeld =>
                                                            {
                                                                return (<td key={materiaToMeld.Id}>{materiaToMeld.MateriaTypeString}</td>);
                                                            })}</tr>)
                                        })}
                                </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
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
                                            <td>{materia.filter(item => item.MateriaType == 0 && (item.AverageNumberOfMelds == 1 || item.AverageNumberOfMelds == 6)).reduce((sum, item) => sum + item.AverageNumberOfMelds, 0)}</td>
                                            <td>{materia.filter(item => item.MateriaType == 1 && (item.AverageNumberOfMelds == 1 || item.AverageNumberOfMelds == 6)).reduce((sum, item) => sum + item.AverageNumberOfMelds, 0)}</td>
                                            <td>{materia.filter(item => item.MateriaType == 2 && (item.AverageNumberOfMelds == 1 || item.AverageNumberOfMelds == 6)).reduce((sum, item) => sum + item.AverageNumberOfMelds, 0)}</td>
                                        </tr>
                                        <tr>
                                            <td>XI</td>
                                            <td>{materia.filter(item => item.MateriaType == 0 && item.AverageNumberOfMelds != 1 && item.AverageNumberOfMelds != 6).reduce((sum, item) => sum + item.AverageNumberOfMelds, 0)}</td>
                                            <td>{materia.filter(item => item.MateriaType == 1 && item.AverageNumberOfMelds != 1 && item.AverageNumberOfMelds != 6).reduce((sum, item) => sum + item.AverageNumberOfMelds, 0)}</td>
                                            <td>{materia.filter(item => item.MateriaType == 2 && item.AverageNumberOfMelds != 1 && item.AverageNumberOfMelds != 6).reduce((sum, item) => sum + item.AverageNumberOfMelds, 0)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                </div>
            }
        </div>
    );
}
   
export default PentameldCalculator;