import Link from 'next/Link'
import Image from 'next/Image'
import logo from '../public/disney.png'

const Navbar = ({account}) => {
    return (
        <div className="navbar">
            <Link href="/"><Image src={logo} alt="Disney Logo" width={90} height={50} /></Link>
            <div className="account-info">
                <p>Welcome {account.username}</p>
                <img className="avatar" src={account.avatar.url} alt="avatar" />
            </div>
        </div>
    )

}

export default Navbar