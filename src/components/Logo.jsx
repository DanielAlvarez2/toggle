import './Logo.css'
export default function Logo(){
    return(
        <div id='logo-wrapper'>
            <div id='logo-container'>
                <div id='logo-top'>
                    <div id="toggle">
                        <div id="toggle-inner"></div>
                    </div>
                    
                    <div id="shadow"></div>
                </div>
                <div id='logo-middle'>
                    <>
                        <h1>toggle</h1>
                        <h2>SOFTWARE</h2>
                    </>
                </div>
                <div id='logo-bottom'>
                    <div id='url'>togglesoftware.com</div>
                    <div id='slogan'>BIG TECH for small business</div>
                </div>
            </div>
        </div>
    )
}