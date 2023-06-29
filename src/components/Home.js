import '../styles/Home.css'

export const Home = () => {
    return (
        <div id='home-root-container'>
            <p>Home component</p>
            <button id='signout-button' onClick={handleClick}>SIGN OUT</button>
        </div>
        )

    function handleClick(){
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userId')
        window.location.reload()
    }
}