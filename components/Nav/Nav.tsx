//Nav component

import AccessibilityMenuComponent from "../Accessibility/Accessibility"
import MenuComponent from "./Menu"

const NavComponent = () => {
    return (
        <nav>
            <MenuComponent />
            <AccessibilityMenuComponent />
        </nav>
    )
}

export default NavComponent