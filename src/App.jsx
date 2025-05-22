import React, { useState } from "react";
import "./App.css";
import ChatComponent from "./components/ChatComponent";
import RecipeComponent from "./components/RecipeComponent";

function App() {
  const [activeTab, setActiveTab] = useState("image-generator");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="App">
      <button
        className={activeTab === 'chat' ? 'active' : ''}
        onClick={() => handleTabChange("chat")}
      >
        Ask AI
      </button>
      <button
        className={activeTab === 'recipe-generator' ? 'active' : ''}
        onClick={() => handleTabChange("recipe-generator")}
      >
        Recipe Generator
      </button>

      <div>
        {activeTab === "chat" && <ChatComponent/>}
        {activeTab === "recipe-generator" && <RecipeComponent/>}
      </div>
    </div>
  );
}

export default App;
