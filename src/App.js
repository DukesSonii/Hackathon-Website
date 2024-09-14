// import React, { useState, useEffect } from "react";

// function App() {
//   const [data, setData] = useState(null);

//   // Fetch data from Express API when the component mounts
//   useEffect(() => {
//     fetch("http://localhost:5000/api/data")
//       .then((response) => response.json())
//       .then((data) => setData(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return (
//     <div className="App">
//       <h1>Express API Data in React</h1>
//       {data ? (
//         <div>
//           <h2>{data.title}</h2>
//           <p>{data.description}</p>
//           <ul>
//             {data.items.map((item) => (
//               <li key={item.id}>
//                 {item.name} - ${item.price}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p>Loading data...</p>
//       )}
//     </div>
//   );
// }

// export default App;

import React from "react";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  );
};

export default App;
