// global variable
let userData = {}
// init
window.onload = () => {
    if (sessionStorage.userData) {
        userData = JSON.parse(sessionStorage.userData)
        userInfo()
    }
    else {
        window.location = '/web_components/login_form'
    }
}
// user info block
userInfo = () => {
    window.location = '/web_components/main_screen/#user_info'
    document.title = 'User information'
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
    window.location = '/web_components/login_form'
    sessionStorage.removeItem('userData')
}

home = () => {
    window.location = '/web_components/main_screen/#home'
    document.title = 'Home'
    document.querySelector('.content').innerHTML = ``
}

activities = () => {
    window.location = '/web_components/main_screen/#activities'
    document.title = 'Activities'
    document.querySelector('.content').innerHTML = ``
}

// contacts block
contacts = () => {
    window.location = '/web_components/main_screen/#contacts'
    document.title = 'Contacts'
    document.querySelector('.content').innerHTML = `
        <div class="container">
            <br>
            <div class="title">Contacts</div>
            <br>
            <div class="about">
                Please contact us if you have any questions. 
                We work from 10 am to 7 pm Moscow time and are ready to answer any questions you may have. 
                If you want to get a consultation outside working hours, please use our monthly subscription.
            </div>
            <br>
            <div class="userinfo">
                <img src="./contacts.png" alt="onetime">
                <div class="userdata">
                    <div>Phone</div>
                    <input id="phone" disabled></input>
                    <div>E-mail</div>
                    <input id="email" disabled></input>
                    <div>Website link</div>
                    <input id="site" disabled></input>
                    <div>Social network link</div>
                    <input id="social" disabled></input>
                </div>
            </div>
            <br>
        </div>
        <div class="container">
            <br>
            <div class="title">Our headquarters</div>
            <br>
            <iframe 
                id="map" 
                width="100%" 
                height="400px" 
                frameborder="0" 
                scrolling="no" 
                src="https://www.openstreetmap.org/export/embed.html?bbox=35.834464,56.83654,35.864464,56.86654&amp;layer=mapquest&amp;marker=56.85154,35.849464"
            ></iframe>
            <br>
        </div>
    `

    document.querySelector('#phone').value  = '+7 900 012 44 17'
    document.querySelector('#email').value  = 'andrewsarkisyan@gmail.com'
    document.querySelector('#site').value  = 'https://andrewsarkisyan.com'
    document.querySelector('#social').value  = 'https://vk.com/id_69_tver'
}