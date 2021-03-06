// global variable
let userData = {}
let subjects = []
// init
window.onload = () => {
    if (sessionStorage.userData) {
        userData = JSON.parse(sessionStorage.userData)
        fetch('https://spreadsheets.google.com/feeds/cells/1TVPaJbgPBHSpcan18Z5QERA6PNPj9UBxc6PoO-n436g/2/public/full?alt=json')
                .then(function(value){
                    if(value.status !== 200){
                        password.style.backgroundColor = '#f7cdd2'
                        username.style.backgroundColor = '#f7cdd2'
                        return Promise.reject(new Error('Ошибка'))
                    }
                        return value.json();
                })
                .then(function(output){
                    for (let i = 0; i < output.feed.entry.length; i++) {
                        output.feed.entry
                        if (output.feed.entry[i].gs$cell.$t == userData.id) {
                            subjects = JSON.parse(output.feed.entry[i+1].gs$cell.$t)
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
                                    <div class="select" onchange="filterSubjects()">
                                        <select class="select-text priority" required>
                                            <option value="all">All</option>
                                            <option value="highest">Highest</option>
                                            <option value="high">High</option>
                                            <option value="medium">Medium</option>
                                            <option value="low">Low</option>
                                            <option value="lowest">Lowest</option>
                                        </select>
                                        <label class="select-label">Priority</label>
                                    </div>
                                    <div class="select" onchange="filterSubjects()">
                                        <select class="select-text type" required>
                                            <option value="all">All</option>
                                            <option value="bug">Bugs</option>
                                            <option value="task">Tascks</option>
                                            <option value="cr">Change requests</option>
                                        </select>
                                        <label class="select-label">Type</label>
                                    </div>
                                    <div>
                                        <div class="group">      
                                            <input required type="text" id="search" oninput="filterSubjects()">
                                            <span class="highlight"></span>
                                            <span class="bar"></span>
                                            <label>Quick search</label>
                                        </div> 
                                    </div>
                                </div>
                                <div class="table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th id="asc" class="sort__description" onclick="sortSubjects('description', this.id)">Description</th>
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
                                    backgroundColor: ['#D44A39', '#4381F7', '#F59131', '#6E39D4'],
                                    borderColor: ['#D44A39', '#4381F7', '#F59131', '#6E39D4']
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
                        let inner = ''
                        let query = document.querySelector('#search').value
                        let type = document.querySelector('.type').value
                        let priority = document.querySelector('.priority').value
                        if (type !== 'all' && priority !== 'all') {
                            inner = ''
                            subjects.forEach(e => {
                                if ( type === e.type && priority === e.priority && e.description.includes(query)) {
                                    inner += `
                                    <tr class="table-row">
                                        <td>${e.description}</th>
                                        <td>${e.priority}</th>
                                        <td>${e.type}</th>
                                    <tr>
                                    `
                                }
                            })
                            document.querySelector('.subjects').innerHTML = inner
                        }
                        else if (type === 'all' && priority !== 'all') {
                            inner = ''
                            subjects.forEach(e => {
                                if (priority === e.priority && e.description.includes(query)) {
                                    inner += `
                                    <tr class="table-row">
                                        <td>${e.description}</th>
                                        <td>${e.priority}</th>
                                        <td>${e.type}</th>
                                    <tr>
                                    `
                                }
                            })
                            document.querySelector('.subjects').innerHTML = inner
                        }
                        else if (type !== 'all' && priority === 'all') {
                            inner = ''
                            subjects.forEach(e => {
                                if (type === e.type && e.description.includes(query)) {
                                    inner += `
                                    <tr class="table-row">
                                        <td>${e.description}</th>
                                        <td>${e.priority}</th>
                                        <td>${e.type}</th>
                                    <tr>
                                    `
                                }
                            })
                            document.querySelector('.subjects').innerHTML = inner
                        }
                        else {
                            inner = ''
                            subjects.forEach(e => {
                                if (e.description.includes(query)) {
                                    inner += `
                                        <tr class="table-row">
                                            <td>${e.description}</th>
                                            <td>${e.priority}</th>
                                            <td>${e.type}</th>
                                        <tr>
                                    `
                                }
                            })
                            document.querySelector('.subjects').innerHTML = inner
                        }
                        if (query) {
                            window.location = `/web_components/main_screen/#home&priority=${priority}&type=${type}&query=${query}`
                        }
                        else {
                            window.location = `/web_components/main_screen/#home&priority=${priority}&type=${type}`
                        }
                    }
                    sortSubjects = (type, order) => {
                        if (type === 'type') {
                            if (order === 'asc') {
                                document.querySelector('.sort__type').id = 'desc'
                                subjects = subjects.sort(function (a, b) {
                                        if (a.type > b.type) {
                                        return 1
                                        }
                                        if (a.type < b.type) {
                                        return -1
                                        }
                                        return 0
                                    })
                            } else {
                                document.querySelector('.sort__type').id = 'asc'
                                subjects = subjects.sort(function (a, b) {
                                    if (a.type < b.type) {
                                      return 1
                                    }
                                    if (a.type > b.type) {
                                      return -1
                                    }
                                    return 0
                                })
                            }
                        }
                        if (type === 'priority') {
                            if (order === 'asc') {
                                document.querySelector('.sort__priority').id = 'desc'
                                subjects = subjects.sort(function (a, b) {
                                        if (a.priority > b.priority) {
                                        return 1
                                        }
                                        if (a.priority < b.priority) {
                                        return -1
                                        }
                                        return 0
                                    })
                            } else {
                                document.querySelector('.sort__priority').id = 'asc'
                                subjects = subjects.sort(function (a, b) {
                                    if (a.priority < b.priority) {
                                      return 1
                                    }
                                    if (a.priority > b.priority) {
                                      return -1
                                    }
                                    return 0
                                })
                            }
                        }
                        if (type === 'description') {
                            if (order === 'asc') {
                                document.querySelector('.sort__description').id = 'desc'
                                subjects = subjects.sort(function (a, b) {
                                        if (a.description > b.description) {
                                        return 1
                                        }
                                        if (a.description < b.description) {
                                        return -1
                                        }
                                        return 0
                                    })
                            } else {
                                document.querySelector('.sort__description').id = 'asc'
                                subjects = subjects.sort(function (a, b) {
                                    if (a.description < b.description) {
                                      return 1
                                    }
                                    if (a.description > b.description) {
                                      return -1
                                    }
                                    return 0
                                })
                            }
                        }
                        filterSubjects()
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
                                        <div class="group">      
                                            <input class="disabled" disabled required id="projects">
                                            <span class="highlight"></span>
                                            <span class="bar"></span>
                                            <label>Total projects</label>
                                        </div> 
                                        <div class="group">      
                                            <input class="disabled" disabled required id="devtime">
                                            <span class="highlight"></span>
                                            <span class="bar"></span>
                                            <label>Total dev. time</label>
                                        </div>
                                        <div class="group">      
                                            <input class="disabled" disabled required id="deployments">
                                            <span class="highlight"></span>
                                            <span class="bar"></span>
                                            <label>Total deployments</label>
                                        </div>
                                        <div class="group">      
                                            <input class="disabled" disabled required id="tests">
                                            <span class="highlight"></span>
                                            <span class="bar"></span>
                                            <label>Total passed tests</label>
                                        </div>
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
                                    backgroundColor: ['#D44A39', '#4381F7', '#F59131', '#6E39D4'],
                                    borderColor: ['#D44A39', '#4381F7', '#F59131', '#6E39D4']
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
                                        <div class="group">      
                                            <input class="disabled" disabled required id="phone">
                                            <span class="highlight"></span>
                                            <span class="bar"></span>
                                            <label>Phone</label>
                                        </div>
                                        <div class="group">      
                                            <input class="disabled" disabled required id="email">
                                            <span class="highlight"></span>
                                            <span class="bar"></span>
                                            <label>E-mail</label>
                                        </div>
                                        <div class="group">      
                                            <input class="disabled" disabled required id="site">
                                            <span class="highlight"></span>
                                            <span class="bar"></span>
                                            <label>Website link</label>
                                        </div>
                                        <div class="group">      
                                            <input class="disabled" disabled required id="social">
                                            <span class="highlight"></span>
                                            <span class="bar"></span>
                                            <label>Social network link</label>
                                        </div>
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
                                        src="https://yandex.ru/map-widget/v1/-/CCUUMSCBgC" 
                                        allowfullscreen="false" 
                                        >
                                    </iframe>
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
                                    <div class="group">      
                                        <input required id="name">
                                        <span class="highlight"></span>
                                        <span class="bar"></span>
                                        <label>Name</label>
                                    </div>
                                    <div class="group">      
                                        <input required id="surname">
                                        <span class="highlight"></span>
                                        <span class="bar"></span>
                                        <label>Surname</label>
                                    </div>
                                    <div class="group">      
                                        <input required id="age">
                                        <span class="highlight"></span>
                                        <span class="bar"></span>
                                        <label>Age</label>
                                    </div>
                                    <div class="group">      
                                        <input required id="ocupation">
                                        <span class="highlight"></span>
                                        <span class="bar"></span>
                                        <label>Ocupation</label>
                                    </div>
                                </div>
                                <div class="actionstab">
                                    <button onclick="saveUserData()" id="save">Save</button>
                                </div>
                            </div>
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
                                    <div class="group">      
                                        <input required id="phone">
                                        <span class="highlight"></span>
                                        <span class="bar"></span>
                                        <label>Phone</label>
                                    </div>
                                    <div class="group">      
                                        <input required id="email">
                                        <span class="highlight"></span>
                                        <span class="bar"></span>
                                        <label>E-mail</label>
                                    </div>
                                    <div class="group">      
                                        <input required id="site">
                                        <span class="highlight"></span>
                                        <span class="bar"></span>
                                        <label>Website link</label>
                                    </div>
                                    <div class="group">      
                                        <input required id="social">
                                        <span class="highlight"></span>
                                        <span class="bar"></span>
                                        <label>Social network link</label>
                                    </div>
                                </div>
                                <div class="actionstab">
                                    <button onclick="saveUserContacts()" id="save">Save</button>
                                </div>
                            </div>
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
                    /* Scroll control */
                    up = () => {
                        const el = document.getElementById('top');
                        el.scrollIntoView({behavior: "smooth"});
                    }
                    window.onscroll = () => {
                        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                        if (scrolled > 100) {
                        document.querySelector(".up__btn").style.display = ""
                        } else {
                        document.querySelector(".up__btn").style.display = "none"
                        }
                    }

                    // init
                    document.querySelector(".up__btn").style.display = "none"
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
                })
    }
    else {
        window.location = '/web_components/login_form'
    }
}
