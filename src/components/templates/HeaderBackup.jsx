import {useState} from 'react'

function Header() {
    return (
        <>
            <nav className="navbar">
                <div className="nav-left">
                    Logo
                </div>
                <div className="nav-menu">
                    <ul>
                        <li>
                            <a href="#">Beranda</a>
                        </li>
                        <li>
                            <a href="#">Promo</a>
                        </li>
                        <li>
                            <a href="#">Produk</a>
                        </li>
                        <li>
                            <a href="#">Kategori</a>
                        </li>
                        <li>
                            <a href="#">Tentang Kami</a>
                        </li>
                    </ul>
                </div>
                <div className="nav-right">
                    
                </div>
            </nav>
        </>
    )
}

export default Header