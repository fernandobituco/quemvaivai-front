import DarkModeSwitcher from "@/components/Switches/DarkModeSwitcher"
import LanguageSwitcher from "@/components/Switches/LanguageSwitcher"

const GlobalSwitches = (props) => {

    const { top } = props

    return (
        <>
            <div style={{ position: 'absolute', top: top, right: 54 }}>
                <DarkModeSwitcher  />
            </div>
            <div style={{ position: 'absolute', top: top, right: 16 }}>
                <LanguageSwitcher  />
            </div>
        </>
    )
}

export default GlobalSwitches