window.onload = () => {
    if (sessionStorage.userData) {
        window.location = '/web_components/main_screen'
    }
    document.title = 'Login'

    loginRequest = () => {
        event.preventDefault()
    
        const username = document.querySelector('#username')
        username.oninput = function() { this.style.backgroundColor = '' }
        const password = document.querySelector('#password')
        password.oninput = function() { this.style.backgroundColor = '' }
    
        if (username.value && password.value) {
            let userData = []
            fetch('https://spreadsheets.google.com/feeds/cells/1TVPaJbgPBHSpcan18Z5QERA6PNPj9UBxc6PoO-n436g/1/public/full?alt=json')
                .then(function(value){
                    if(value.status !== 200){
                        password.style.backgroundColor = '#f7cdd2'
                        username.style.backgroundColor = '#f7cdd2'
                        return Promise.reject(new Error('Ошибка'))
                    }
                        return value.json();
                })
                .then(function(output){
                    let jsonData = []
                    output.feed.entry.forEach(e => {jsonData.push(JSON.parse(e.gs$cell.$t))})
                    jsonData.forEach(e =>{
                        if (e.passwd === password.value && e.username === username.value) {
                            document.querySelector('.container').className = 'container login__form animate__animated animate__bounceOutLeft'
                            setTimeout(() => {
                                userData.push(e)
                                sessionStorage.setItem('userData', JSON.stringify(userData[0]))
                                window.location = '/web_components/main_screen/#user_info'
                            }, 450)
                        }
                        else {
                            username.style.backgroundColor = '#f7cdd2'
                            password.style.backgroundColor = '#f7cdd2'
                        }
                    })
                })
        }
        else {
            if (!username.value) {
                username.style.backgroundColor = '#f7cdd2'
            }
            if (!password.value) {
                password.style.backgroundColor = '#f7cdd2'
            }
        }
    }
    requestNewAcc = () => {
                event.preventDefault()
                let inner = `
                    <div class="container request__form">
                        <div class="title">New account</div>
                        <form>
                            <br>
                            <div class="group">      
                                <input required type="text" id="newUsername">
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Username</label>
                            </div>
                            <div class="group">      
                                <input required type="password" id="newPassword">
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Password</label>
                            </div>
                            <div class="group">      
                                <input required type="password" id="newPassword2">
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Repeat password</label>
                            </div>
                            <div class="group">      
                                <input required type="e-mail" id="mail">
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>E-mail</label>
                            </div>
                            <br>
                            <button id="create">
                                <span>Request</span></button>
                            </button>
                        </form>
                        <form>
                            <button id="cancel">
                                <span>Cancel</span></button>
                            </button>
                        </form>
                    </div>
                `
                document.querySelector('body').innerHTML += inner
                document.querySelector('.login__form').style.display = 'none';
                document.querySelector('.help').style.display = 'none'
                document.querySelector('#newUsername').oninput = function() {
                    this.style.backgroundColor = ''
                }
                document.querySelector('#newPassword').oninput = function() {
                    this.style.backgroundColor = ''
                }
                document.querySelector('#newPassword2').oninput = function() {
                    this.style.backgroundColor = ''
                }
                document.querySelector('#create').onclick = () => { createNewAcc() }
                document.querySelector('#cancel').onclick = () => {
                    event.preventDefault()
                    document.querySelector('.login__form').style.display = 'block'
                    document.querySelector('.help').style.display = 'block'
                    document.querySelector('.request__form').remove()
                }
    }
    createNewAcc = () => {
                event.preventDefault()
            
                let env_var = [
                    "\x38\x30\x36\x34\x38\x39\x34\x31\x31\x3A\x41\x41\x48\x59\x31\x73\x57\x33\x37\x73\x72\x6E\x2D\x43\x2D\x31\x38\x30\x50\x55\x72\x72\x59\x76\x47\x31\x56\x74\x76\x64\x63\x41\x34\x55\x55",
                    "\x2D\x31\x30\x30\x31\x34\x37\x39\x32\x30\x32\x31\x34\x37"
                ]
            
                let token = env_var[0]
                let chatId = env_var[1]

                let newUsername = document.querySelector('#newUsername')
                let newPassword = document.querySelector('#newPassword')
                let newPassword2 = document.querySelector('#newPassword2')
                let email = document.querySelector('#mail')
                
                if (newUsername.value
                    && newPassword.value.length > 3
                    && newPassword.value === newPassword2.value
                    && email.value
                    && email.value.includes('@')
                    && email.value.includes('.')
                    ) {
                    fetch('https://api.telegram.org/bot' + token + '/' +
                        'sendMessage?chat_id=' + chatId + '&text=' +
                        'Новая заявка:' +
                        "%0A------------------------------%0A" +
                        'Логин: ' +  newUsername.value +
                        "%0A------------------------------%0A" +
                        'Пароль: ' + newPassword2.value +
                        "%0A------------------------------%0A" +
                        'Эл. почта: ' + email.value)
                    .then(function(value){
                        if(value.status == 200){
                            document.querySelector('.request__form').innerHTML = `
                                <div class="title">You requested new account.</div>
                                <br>
                                <form>
                                    <div class="about">
                                        We will inform you via e-mail when it will be activated.
                                    </div>
                                    <br>
                                    <button id="cancel">
                                        <span>Back</span></button>
                                    </button>
                                </form>
                            `
                            document.querySelector('#cancel').onclick = () => {
                                event.preventDefault()
                                document.querySelector('.login__form').style.display = 'block'
                                document.querySelector('.help').style.display = 'block'
                                document.querySelector('.request__form').remove()
                            }
                        }
                    })
                    .catch(function(reason){
                        console.error(reason);
                    })   
                }
                else {
                    if (!newUsername.value) {
                        newUsername.style.backgroundColor = '#f7cdd2'
                    }
                    if (newPassword.value.length < 4) {
                        newPassword.style.backgroundColor = '#f7cdd2'
                        newPassword2.style.backgroundColor = '#f7cdd2'
                    }
                    if (newPassword.value != newPassword2.value) {
                        newPassword2.style.backgroundColor = '#f7cdd2'
                    }
                    if (!email.value && !email.value.includes('@') && !email.value.includes('.')) {
                        email.style.backgroundColor = '#f7cdd2'
                    }
                }
    }
    info = () => {
                if (document.querySelector('.info__form')) {
                    document.querySelector('.login__form').style.display = 'block'
                    document.querySelector('.help').style.display = 'block'
                    document.querySelector('.info__form').remove()
                }
                else if (!document.querySelector('.request__form') && !document.querySelector('.info__form')) {
                    document.querySelector('.login__form').style.display = 'none'
                    document.querySelector('.help').style.display = 'none';
                    const br = document.createElement('br')
                    const br2 = document.createElement('br')
                    const infoContainer = document.createElement('div')
                    infoContainer.className = 'container info__form'
                    const title = document.createElement('div')
                    title.className = 'title'
                    title.innerText = 'About this service:'
                    const infoForm = document.createElement('form')
                    const about = document.createElement('div')
                    about.className = 'about'
                    about.innerText = `Here you can track the progress of all the projects we do for you. 
                        In real time, reports on the work done are generated. 
                        You can correct the terms of reference at any time and consult with our specialists.`
                    const cancelBtn = document.createElement('button')
                    cancelBtn.innerText = 'Back'
                    cancelBtn.id = 'cancel'
                    cancelBtn.onclick = () => {
                        event.preventDefault()
            
                        document.querySelector('.login__form').style.display = 'block'
                        document.querySelector('.help').style.display = 'block'
                        infoContainer.remove()
                    }
                    infoContainer.appendChild(title)
                    infoContainer.appendChild(br)
                    infoForm.appendChild(about)
                    infoForm.appendChild(br2)
                    infoForm.appendChild(cancelBtn)
                    infoContainer.appendChild(infoForm)
                    document.body.appendChild(infoContainer)
                }
    }
}