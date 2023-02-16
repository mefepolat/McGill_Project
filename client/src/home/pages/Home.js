import {AuthContext } from "../../shared/components/AuthContext";
import { useContext, useState, useEffect } from "react";
import ReportButton from "../components/ReportButton";
import BeginTrip from "../components/BeginTrip";
import EndTrip from "../components/EndTrip";
import "./Home.css";
import BikeMap from "../../shared/components/BikeMap";
const HomePage = () => {
    const { user } = useContext(AuthContext);
    const [activeTrip, setActiveTrip] = useState(null);
  
    useEffect(() =>{  
      
      const interval = setInterval(() => {
        fetch('http://localhost:3000/api/status', {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({user})
        })
        .then(response => response.json())
        .then(data => {
        
          if(data.data !== null){
            setActiveTrip(data.data)
            console.log(data.data)
          } else{
            console.log(data.message)
          }
          
        })
        .catch(error => {
          console.error(error);
        });
      }, 1500);
      return () => {
        clearInterval(interval)
      };
    
    }, [user])
   
    function handleBeginTrip(tripId){
      setActiveTrip(tripId);
    }

    function handleEndTrip(){
      setActiveTrip(null);
    }
  
    return (
      <div className="home_section">
        
        
        {user ? (
           <div>
            {activeTrip ? 
             <div className="container">
              <h1 className="begin-message">Please select a station to end your trip!</h1>
              <div className="bike-and-trip">
             <BikeMap  />
             <EndTrip tripId={activeTrip} onEndTrip={handleEndTrip} />
             <ReportButton /> 
             </div>
           </div>
           : 
           <div className="container">
           <div className="begin-box">
           <h1 className="begin-message">Please select a bike and station to begin your trip!</h1>
           <div className="bike-and-trip">
           <BikeMap />
           
           <BeginTrip className="BeginTrip" onBeginTrip={handleBeginTrip} />
           </div>
           </div>
           </div>
            }
           
          
          
        </div>
        ) : (
          <div className="landing-message">
            
            <h1 className="welcome-message">Welcome to Bike!</h1>
            <p>To be able to rent a bike and see our content please <a href="/login">Sign in</a> or <a href="/register">Sign up!</a></p>
          </div>
        )}
  
       
      </div>
    );
  };
  
  export default HomePage;