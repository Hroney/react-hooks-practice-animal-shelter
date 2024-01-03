import React, { useEffect, useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  useEffect(() => {
    fetch("http://localhost:3001/pets")
      .then((r) => r.json())
      .then(setPets)
  }, [])

  function onChangeType(optionValue) {
    setFilters({ type: optionValue })
  }

  function onFindPetsClick() {
    if (filters.type === "all") {
      fetch("http://localhost:3001/pets")
        .then((r) => r.json())
        .then(setPets)
    } else {
      fetch(`http://localhost:3001/pets?type=${filters.type}`)
        .then((r) => r.json())
        .then(setPets)
    }
  }

  function onAdoptPet(petId) {
    const updatedPetsList = pets.map((pet) => {
      if (pet.id === petId) {
        pet.isAdopted = true
      }
      return pet
    })
    setPets(updatedPetsList)
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              onChangeType={onChangeType}
              onFindPetsClick={onFindPetsClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser
              pets={pets}
              onAdoptPet={onAdoptPet}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;