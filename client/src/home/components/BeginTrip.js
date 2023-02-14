import {useState, useEffect} from "react";
import './BeginTrip.css';
import {useContext} from "react";
import {AuthContext} from "../../shared/components/AuthContext";

function SelectStation() {
  const [station, setStation] = useState('');
  const [bikeId, setBikeId] = useState('');
  const [bikes, setBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState('');

  useEffect(() => {
    const fetchBikes = async () => {
      try{
        const response = await fetch("http://localhost:3000/api/bikes");
        const data = await response.json();
        console.log(data);
        setBikes(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchBikes();
  },[]);

  

  const {user} = useContext(AuthContext);
  const handleStationChange = (event) => {
    setStation(event.target.value);
    
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const startDate = new Date().getUTCDate();
    try{
      const response = await fetch("http://localhost:3000/api/newTrip", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({station, startDate, user})
      });
      const trip = await response.json();
    } catch (err){
      console.error(err);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="station">Station:</label>
        <select
        id="station"
        value={station}
        onChange={handleStationChange}>
          <option value="Saint-Leonard">Saint-Leonard</option>
          <option value="Berri-Uqam">Berri-UQAM</option>
          <option value="Longueuil">Longueui</option>
        </select>
      </div>
      <div>
        <label htmlFor="station">Available Bikes:</label>
        <select
        id="bike"
        value={selectedBike || ""}
        onChange={(event) => setSelectedBike(event.target.value)}>
          {!bikes.length ? (
    <option value="">No bikes available.</option>
  ) : (
    <>
      <option value="">Select a bike</option>
      {bikes.map((bike) => (
        <option key={bike._id} value={bike._id}>
          {bike.bikeType}
        </option>
      ))}
    </>)}
        </select>
      </div>
      <button type="submit">Begin Trip</button>
    </form>
  );
}

export default SelectStation;