import '../../styles/Footer.css'

function Footer(): React.ReactElement {
  const year: number = new Date().getFullYear()
  const range: string | number = year === 2024 ? year : `2024 - ${year}`

  return (
    <footer className='lmj-footer'>
      <div className='lmj-footer-content'>
        <div className='lmj-footer-section'>
          <h3>La Maison Jungle</h3>
          <p>Votre spécialiste des plantes d'intérieur</p>
          <p>🌿🌱🌵 Pour les passionné·e·s de plantes</p>
        </div>

        <div className='lmj-footer-section'>
          <h4>Contact</h4>
          <p>📧 contact@lamaisonjungle.fr</p>
          <p>📞 01 23 45 67 89</p>
          <p>📍 123 Rue des Plantes, 75001 Paris</p>
        </div>

        <div className='lmj-footer-section'>
          <h4>Horaires</h4>
          <p>Lun-Sam: 9h-19h</p>
          <p>Dimanche: 10h-17h</p>
        </div>
      </div>

      <div className='lmj-footer-bottom'>
        <p>© La Maison Jungle - {range} | Tous droits réservés</p>
      </div>
    </footer>
  )
}

export default Footer