// global variable
let userData = {}
// init
window.onload = () => {
    if (sessionStorage.userData) {
        userData = JSON.parse(sessionStorage.userData)
        home()
        smartSwitch = () => {
            if (window.location.hash === '#user_info') { userInfo(false) }
            if (window.location.hash.split('=') === '#home&priority') { 
                home()
                document.querySelector('.type').value = window.location.hash.split('=')[2]
                document.querySelector('.priority').value = window.location.hash.split('=')[1].split('&')[0]
                filterSubjects()
            }
            if (window.location.hash === '#activities') { activities(false) }
            if (window.location.hash === '#contacts') { contacts(false) }
        }
        window.addEventListener('popstate', smartSwitch);
    }
    else {
        window.location = '/web_components/login_form'
    }
}
// home tab
home = () => {    
    document.title = 'Home'
    document.querySelector('.content').innerHTML = `
        <div class="container">
            <br>
            <div class="title">Subjects list</div>
            <br>
            <div class="about">
            Here are collected all the bugs, tascks and change requests that appear in the development of your projects. 
            You can view them all and leave comments on them with wishes.
            </div>
            <br>
            <div class="serchbar">
                 <select class="priority" onchange="filterSubjects()">
                    <option value="all">All</option>
                    <option value="highest">Highest</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                    <option value="lowest">Lowest</option>
                </select> 
                <select class="type" onchange="filterSubjects()">
                    <option value="all">All</option>
                    <option value="bug">Bugs</option>
                    <option value="task">Tascks</option>
                    <option value="cr">Change requests</option>
                </select>
                <div>
                    <form>
                        <input type="text" id="search" placeholder="Quick search" oninput="filterSubjects()">
                    </form> 
                </div>
            </div>
            <div class="table">
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody class="subjects">
                    </tbody>
                </table>
            </div>
            <br>
        </div>
        <div class="container">
            <br>
            <div class="title">Total subjects chart</div>
            <br>
            <div class="canvas">
                <canvas id="myChart"></canvas>
            </div>
            <br>
        </div>
    `
    filterSubjects()

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Bugs', 'CRs', 'Tascks', 'Tests'],
            datasets: [{
                label: 'Total items',
                data: JSON.parse(sessionStorage.userData).activities,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ]
            }]
        },
        options: {
            legend: {
                display: false
            },
            layout: {
                padding: {
                    left: 20,
                    right: 40,
                    top: 30,
                    bottom: 10
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
filterSubjects = () => {
    let subjects = ''
    let query = document.querySelector('#search').value
    let type = document.querySelector('.type').value
    let priority = document.querySelector('.priority').value
    if (type !== 'all' && priority !== 'all') {
        subjects = ''
        userData.subjects.forEach(e => {
            if ( type === e.type && priority === e.priority && e.description.includes(query)) {
                subjects += `
                <tr class="table-row">
                    <td>${e.description}</th>
                    <td>${e.priority}</th>
                    <td>${e.type}</th>
                <tr>
                `
            }
        })
        document.querySelector('.subjects').innerHTML = subjects
    }
    else if (type === 'all' && priority !== 'all') {
        subjects = ''
        userData.subjects.forEach(e => {
            if (priority === e.priority && e.description.includes(query)) {
                subjects += `
                <tr class="table-row">
                    <td>${e.description}</th>
                    <td>${e.priority}</th>
                    <td>${e.type}</th>
                <tr>
                `
            }
        })
        document.querySelector('.subjects').innerHTML = subjects
    }
    else if (type !== 'all' && priority === 'all') {
        subjects = ''
        userData.subjects.forEach(e => {
            if (type === e.type && e.description.includes(query)) {
                subjects += `
                <tr class="table-row">
                    <td>${e.description}</th>
                    <td>${e.priority}</th>
                    <td>${e.type}</th>
                <tr>
                `
            }
        })
        document.querySelector('.subjects').innerHTML = subjects
    }
    else {
        subjects = ''
        userData.subjects.forEach(e => {
            if (e.description.includes(query)) {
                subjects += `
                    <tr class="table-row">
                        <td>${e.description}</th>
                        <td>${e.priority}</th>
                        <td>${e.type}</th>
                    <tr>
                `
            }
        })
        document.querySelector('.subjects').innerHTML = subjects
    }
    window.location = `/web_components/main_screen/#home&priority=${priority}&type=${type}`
}
// activities tab
activities = (changeUrl = true) => {
    if (changeUrl) {
        window.location = '/web_components/main_screen/#activities'
    }
    
    document.title = 'Activities'
    document.querySelector('.content').innerHTML = `
        <div class="container">
            <br>
            <div class="title">Activities on your projects</div>
            <br>
            <div class="about">
                Here you can track the progress of all the projects we make for you.
                You can also leave an estimate for each sprint if your project is being carried out in several stages.
            </div>
            <br>
            <div class="userinfo">
                <img src="./activities.png" alt="activities">
                <div class="userdata">
                    <div>Total projects</div>
                    <input id="projects" disabled></input>
                    <div>Total dev. time</div>
                    <input id="devtime" disabled></input>
                    <div>Total deployments</div>
                    <input id="deployments" disabled></input>
                    <div>Total passed tests</div>
                    <input id="tests" disabled></input>
                </div>
            </div>
            <br>
        </div>
        <div class="container">
            <br>
            <div class="title">Total activities chart</div>
            <br>
            <div class="canvas">
                <canvas id="myChart"></canvas>
            </div>
            <br>
            <div class="reports">
                <button id="save">
                    <img src="./download.png" width="24" height="14">
                    Daily report
                </button>
                <button id="save">
                    <img src="./download.png" width="24" height="14">
                    Weekly report
                </button>
                <button id="save">
                    <img src="./download.png" width="24" height="14">
                    Monthly report
                </button>
            </div>
            <br>
        </div>
    `
    let total = JSON.parse(sessionStorage.userData).total

    document.querySelector('#projects').value  = total[0]
    document.querySelector('#devtime').value  = total[1]
    document.querySelector('#deployments').value  = total[2]
    document.querySelector('#tests').value  = total[3]

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Bugs', 'CRs', 'Tascks', 'Tests'],
            datasets: [{
                label: 'Total items',
                data: JSON.parse(sessionStorage.userData).activities,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ]
            }]
        },
        options: {
            legend: {
                display: false
            },
            layout: {
                padding: {
                    left: 20,
                    right: 40,
                    top: 30,
                    bottom: 10
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
// contacts tab
contacts = (changeUrl = true) => {
    if (changeUrl) {
        window.location = '/web_components/main_screen/#contacts'
    }
    
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
            <div>
                <iframe 
                    id="map" 
                    width="96%" 
                    height="400px" 
                    frameborder="0" 
                    scrolling="no" 
                    src="https://www.openstreetmap.org/export/embed.html?bbox=35.834464,56.83654,35.864464,56.86654&amp;layer=mapquest&amp;marker=56.85154,35.849464"
                ></iframe>
            </div>
            <br>
            <div class="reports">
                <button id="save">
                    <img src="./download.png" width="24" height="14">
                    Services
                </button>
                <button id="save">
                    <img src="./download.png" width="24" height="14">
                    Prices
                </button>
                <button id="save">
                    <img src="./download.png" width="24" height="14">
                    Portfolio
                </button>
            </div>
            <br>
        </div>
    `

    document.querySelector('#phone').value  = '+7 900 012 44 17'
    document.querySelector('#email').value  = 'andrewsarkisyan@gmail.com'
    document.querySelector('#site').value  = 'https://andrewsarkisyan.com'
    document.querySelector('#social').value  = 'https://vk.com/id_69_tver'
}
// user info icon
readURL = (input) => {
    if (input.files && input.files[0]) {
      var reader = new FileReader()
      reader.onload = function(e) {
        document.querySelector('#user_photo').src = e.target.result
        userData.photo = e.target.result
      }
      reader.readAsDataURL(input.files[0])
    }
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
userInfo = (changeUrl = true) => {
    if (changeUrl) {
        window.location = '/web_components/main_screen/#user_info'
    }
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
            <div>
                <img id="user_photo" src=${ userData.photo || './user_photo.png'} alt="user">
                <input type="file" id="photo" accept=".jpg, .jpeg, .png" onchange="readURL(this)">
            </div>
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
// logout icon
logoutRequest = () => {
    window.location = '/web_components/login_form'
    sessionStorage.removeItem('userData')
}