import { Navbar, Container, Column } from 'rbx'
import logoImage from '../../images/logo.png'
//Importando o header scss
import '../../../styles/header.scss'
import { Link } from 'react-router-dom'


function Header() {
    return (
        //Barra de navegação
        <Navbar>
            {/* Espaçamento */}
            <Container>
                {/* Onde aparece o logo da Navbar */}
                <Navbar.Brand>
                    <Link to="/">
                        <img src={logoImage} />
                    </Link>
                    {/* Método para abrir e fechar o menu para resoluções menores (mobile)  */}
                    <Navbar.Burger
                        className="navbar-burger burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbar-menu">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </Navbar.Burger>
                </Navbar.Brand>

                {/* Onde mostra o menu do navbar  */}
                <Navbar.Menu id="navbar-menu">
                    <Navbar.Segment as="div" className="navbar-item navbar-end" align="right">

                        <Column.Group>
                            <Column>
                                <Link to="/register" className="button is-white has-text-custom-purple">Register</Link>
                            </Column>
                            <Column>
                                <Link to="/login" className="button is-outlined is-custom-purple">Login</Link>
                            </Column>
                        </Column.Group>


                    </Navbar.Segment>
                </Navbar.Menu>
            </Container>
        </Navbar>
    )
}

export default Header