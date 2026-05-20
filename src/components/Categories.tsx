import '../styles/Categories.css'
import type { PlantCategory } from '../types'

interface CategoriesProps {
  categories: PlantCategory[]
  activeCategory: PlantCategory | ''
  setActiveCategory: (category: PlantCategory | '') => void
}

function Categories({ setActiveCategory, categories, activeCategory }: CategoriesProps): React.ReactElement {
  return (
    <div className='lmj-categories'>
      <div className='lmj-categories-tags'>
        <button
          className={`lmj-category-tag ${activeCategory === '' ? 'active' : ''}`}
          onClick={() => setActiveCategory('')}
        >
          Toutes
        </button>
        {categories.map((cat: PlantCategory) => (
          <button
            key={cat}
            className={`lmj-category-tag ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Categories