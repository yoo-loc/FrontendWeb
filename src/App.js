import React, { useEffect } from "react";

function App() {
    useEffect(() => {
        fetch("http://localhost:8080/api/test") // Adjust to your backend's URL
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error("Error:", error));
    }, []);

    return (
        <div className="App">
            <h1>Check Backend Connection</h1>
        </div>
    );
}

export default App;
