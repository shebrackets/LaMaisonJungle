import { useState } from 'react'
import type React from 'react'
import { plantList } from '../datas/plantList'
import type { Plant, PlantCategory } from '../types' 
import PlantItem from './ui/PlantItem'
import Categories from './Categories'
import '../styles/ShoppingList.css'

interface ShoppingListProps {
  addToCart: (plant: Plant) => void
}

function ShoppingList({ addToCart }: ShoppingListProps): React.ReactElement {
  const [activeCategory, setActiveCategory] = useState<PlantCategory | ''>('')

  const categories: PlantCategory[] = plantList.reduce<PlantCategory[]>(
    (acc, plant) =>
      acc.includes(plant.category) ? acc : acc.concat(plant.category),
    []
  )

  const handleAddToCart = (name: string): void => {
    const plant = plantList.find((p) => p.name === name)
    if (plant) {
      addToCart(plant)
    }
  }

  return (
    <div className='lmj-shopping-list'>
      <Categories
        categories={categories}
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
      />

      <ul className='lmj-plant-list'>
        {plantList.map(({ id, cover, name, price, category }: Plant) =>
          !activeCategory || activeCategory === category ? (
            <li key={id}>
              <PlantItem
                id={id}
                cover={cover}
                name={name}
                price={price}
                onAddToCart={() => handleAddToCart(name)}
              />
            </li>
          ) : null
        )}
      </ul>
    </div>
  )
}

export default ShoppingList