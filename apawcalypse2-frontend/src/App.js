
// import React, { useState } from "react";
// import CityInput from "./components/CityInput";
// import Result from "./components/Result";
// import DarkModeToggle from "./components/DarkModeToggle";
// import { LanguageProvider } from "./LanguageContext";
// import "./App.css"; // optional global styles

// export default function App() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   async function fetchData(cityName) {
//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5000/api/data`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ city: cityName }),
//       });
//       const json = await res.json();
//       setData(json);
//     } catch (e) {
//       alert("Failed to fetch data. Try again.");
//     }
//     setLoading(false);
//   }

//   return (
//     <LanguageProvider>
//       <div className="app-container">
//         <DarkModeToggle />
//         {!data ? (
//           <CityInput onSubmit={fetchData} loading={loading} />
//         ) : (
//           <Result data={data} onBack={() => setData(null)} />
//         )}
//       </div>
//     </LanguageProvider>
//   );
// }



import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import CityInput from "./components/CityInput";
import Result from "./components/Result";
import DarkModeToggle from "./components/DarkModeToggle";
import { LanguageProvider } from "./LanguageContext";
import "./App.css";

function AppRoutes() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function fetchData(cityName) {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city: cityName }),
      });
      const json = await res.json();
      setData(json);
      navigate("/result");
    } catch (e) {
      alert("Failed to fetch data. Try again.");
    }
    setLoading(false);
  }

  const handleBack = () => {
    setData(null);
    navigate("/city");
  };

  return (
    <div className="app-container">
      <DarkModeToggle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/city"
          element={<CityInput onSubmit={fetchData} loading={loading} />}
        />
        <Route
          path="/result"
          element={
            data ? <Result data={data} onBack={handleBack} /> : <Navigate to="/city" />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LanguageProvider>
  );
}
