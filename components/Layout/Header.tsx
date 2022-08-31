//Header component

import Logo from "../Logo/Logo"
import Nav from "../Nav/Nav"

const HeaderComponent = () => {
    return (
        <header className={`flex w-full h-auto justify-start items-stretch py-2 px-16 bg-teal-300`}>
            <Logo />
            <h1>Portfolio</h1>
            <Nav />
        </header>
    )
}

export default HeaderComponent