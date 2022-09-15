//Logo component
import { DesignLogo } from '../Icons'

interface LogoProps {
    title: string,
    logo: any
}

const LogoComponent = (props:any) => {

    const { title, logo } = props

    return (
        <div id="logo" className={``}>
            <h1 className='text-3xl font-bold'>{title}</h1>
            <img src={logo} alt="logo" />
        </div>
    )
}

export default LogoComponent