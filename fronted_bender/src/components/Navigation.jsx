import { Link } from 'react-router-dom'
export function Navigation() {
  return (
    <div>
        <Link to = "/reporte">
          <h1>
              BENDER NEWS
          </h1>
        </Link>
        <Link to = "/campanas">Campañas</Link>
    </div>
  )
}

