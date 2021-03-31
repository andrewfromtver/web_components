window.onload = () => {
    if (sessionStorage.userData) {
        window.location = '/web_components/main_screen'
    }
    document.title = 'Login'

    loginRequest = () => {
        event.preventDefault()
    
        const username = document.querySelector('#username')
        username.oninput = function() { this.style.border = '' }
        const password = document.querySelector('#password')
        password.oninput = function() { this.style.border = '' }
    
        if (username.value && password.value) {
            let userData = []
            fetch('https://spreadsheets.google.com/feeds/cells/1TVPaJbgPBHSpcan18Z5QERA6PNPj9UBxc6PoO-n436g/1/public/full?alt=json')
                .then(function(value){
                    if(value.status !== 200){
                        password.style.border = '3px solid #f7cdd2'
                        username.style.border = '3px solid #f7cdd2'
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
                            username.style.border = '3px solid #f7cdd2'
                            password.style.border = '3px solid #f7cdd2'
                        }
                    })
                })
        }
        else {
            if (!username.value) {
                username.style.border = '3px solid #f7cdd2'
            }
            if (!password.value) {
                password.style.border = '3px solid #f7cdd2'
            }
        }
    }
    newAccForm = () => {
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
                            <button id="create" onclick="newAccRequest()">
                                <span>Request</span></button>
                            </button>
                        </form>
                        <form>
                            <button id="cancel" onclick="closeAccForm()">
                                <span>Cancel</span></button>
                            </button>
                        </form>
                    </div>
                `
                document.querySelector('body').innerHTML += inner
                document.querySelector('.login__form').style.display = 'none';
                document.querySelector('#newUsername').oninput = function() {
                    this.style.border = ''
                }
                document.querySelector('#newPassword').oninput = function() {
                    this.style.border = ''
                }
                document.querySelector('#newPassword2').oninput = function() {
                    this.style.border = ''
                }
                document.querySelector('#mail').oninput = function() {
                    this.style.border = ''
                }
    }
    newAccRequest = () => {
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
                        newUsername.style.border = '3px solid #f7cdd2'
                    }
                    if (newPassword.value.length < 4) {
                        newPassword.style.border = '3px solid #f7cdd2'
                        newPassword2.style.border = '3px solid #f7cdd2'
                    }
                    if (newPassword.value != newPassword2.value) {
                        newPassword2.style.border = '3px solid #f7cdd2'
                    }
                    if (!email.value || !email.value.includes('@') || !email.value.includes('.')) {
                        email.style.border = '3px solid #f7cdd2'
                    }
                }
    }
    closeAccForm = () => {
        event.preventDefault()
        document.querySelector('.login__form').style.display = 'block'
        document.querySelector('.request__form').remove()
        const username = document.querySelector('#username')
        username.oninput = function() { this.style.border = '' }
        const password = document.querySelector('#password')
        password.oninput = function() { this.style.border = '' }
    }
}