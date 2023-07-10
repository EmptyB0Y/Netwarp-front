import arrow from '../assets/Icons/arrow-right.webp'

export const Profile = ({username}) => {
    if(sessionStorage.getItem('profileId') === null){
        return (
            <form id='signup-form' onSubmit={(e) => handleSubmit(e)}>
                <p>Username :</p>
                <input name='username-input'></input>
                <p className='form-error' id='username-error'>You must enter a username !</p>
                <button id='submit-button' name='submit'><img alt='submit' id='arrow-submit' src={arrow}></img></button>
            </form>
        )
    }
    return (
        <div id='profile-root-container'>
            <p>test</p>
        </div>
    )

    function handleSubmit(){

    }
    
}