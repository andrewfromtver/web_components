let userData = {}

window.onload = () => {
    if (sessionStorage.userData) {
        userData = JSON.parse(sessionStorage.userData)
        userInfo()
    }
    else {
        window.location = '/login_form'
    }
}

userInfo = () => {
    document.querySelector('.content').innerHTML = ``
    window.location = '/main_screen/#user_info'
    document.querySelector('.content').innerHTML = `
    <div class="container">
        <br>
        <div class="title">User data</div>
        <br>
        <div class="about">
            Here you can enter information about yourself. 
            Please fill out all fields.
            Do not forget to add your photo to your profile description, we are very pleased to see our clients =)
        </div>
        <br>
        <div class="userinfo">
            <img src="./user_photo.png" alt="user">
            <div class="userdata">
                <div>Name</div>
                <input id="name"></input>
                <div>Surname</div>
                <input id="surname"></input>
                <div>Age</div>
                <input id="age"></input>
                <div>Ocupation</div>
                <input id="ocupation"></input>
            </div>
            <div class="actionstab">
                <button onclick="saveUserData()" id="save">Save</button>
            </div>
        </div>
        <br>
    </div>

    <div class="container">
        <br>
        <div class="title">Tariff plan</div>
        <div class="about">
            Here you can choose your personal tariff plan for the provision of services.
            Please note that we offer both monthly payment plans and services with one-time payments.
        </div>
        <br>
        <div class="tariff">
            <div id="onetime" onclick="changeUserTariff(false)">
                <img src="./onetime.png" alt="onetime">
                <p>One time payment</p>
            </div>
            <div id="monthly" onclick="changeUserTariff(true)">
                <img src="./monthly.png" alt="monthly">
                <p>Monthly plan</p>
            </div>
        </div>
        <br>
    </div>

    <div class="container">
        <br>
        <div class="title">User contacts</div>
        <br>
        <div class="about">
            Please provide your contact details. 
            If we made a web site for you, then indicate its address. 
            Please do not hesitate to tell as much about yourself as possible, 
            provide a link to your profile on Instagram, Facebook or other social network.
        </div>
        <br>
        <div class="userinfo">
            <img src="./contacts.png" alt="onetime">
            <div class="userdata">
                <div>Phone</div>
                <input id="phone"></input>
                <div>E-mail</div>
                <input id="email"></input>
                <div>Website link</div>
                <input id="site"></input>
                <div>Social network link</div>
                <input id="social"></input>
            </div>
            <div class="actionstab">
                <button onclick="saveUserContacts()" id="save">Save</button>
            </div>
        </div>
        <br>
    </div>
    `

    document.querySelector('#name').value  = userData.name
    document.querySelector('#surname').value  = userData.surname
    document.querySelector('#age').value  = userData.age
    document.querySelector('#ocupation').value  = userData.ocupation

    if (userData.subscribed) {
        document.querySelector('#monthly').style.boxShadow = '0 5px 25px #0589ed'
    }
    else {
        document.querySelector('#onetime').style.boxShadow = '0 5px 25px #0589ed'
    }

    document.querySelector('#phone').value  = userData.phone
    document.querySelector('#email').value  = userData.email
    document.querySelector('#site').value  = userData.site
    document.querySelector('#social').value  = userData.social
}

saveUserData = () => {
    userData.name = document.querySelector('#name').value
    userData.surname = document.querySelector('#surname').value
    userData.age = document.querySelector('#age').value
    userData.ocupation = document.querySelector('#ocupation').value

    sessionStorage.setItem('userData', JSON.stringify(userData))
}

changeUserTariff = (monthly = true) => {
    if (monthly) {
        userData.subscribed = true
        document.querySelector('#monthly').style.boxShadow = '0 5px 25px #0589ed'
        document.querySelector('#onetime').style.boxShadow = ''
    }
    else {
        userData.subscribed = false
        document.querySelector('#monthly').style.boxShadow = ''
        document.querySelector('#onetime').style.boxShadow = '0 5px 25px #0589ed'
    }
    sessionStorage.setItem('userData', JSON.stringify(userData))
}

saveUserContacts = () => {
    userData.phone = document.querySelector('#phone').value
    userData.email = document.querySelector('#email').value
    userData.site = document.querySelector('#site').value
    userData.social = document.querySelector('#social').value

    sessionStorage.setItem('userData', JSON.stringify(userData))
}

logoutRequest = () => {
    window.location = '/login_form'
    sessionStorage.removeItem('userData')
}

home = () => {
    window.location = '/main_screen/#home'
}

activities = () => {
    window.location = '/main_screen/#activities'
}

contacts = () => {
    window.location = '/main_screen/#contacts'
}