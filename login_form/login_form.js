let usernames = []

window.onload = () => {
    if (sessionStorage.userData) {
        window.location = '/web_components/main_screen'
    }
    document.title = 'Login'
    fetch('https://spreadsheets.google.com/feeds/cells/1TVPaJbgPBHSpcan18Z5QERA6PNPj9UBxc6PoO-n436g/2/public/full?alt=json')
        .then(function(value){
            if(value.status !== 200){
                return Promise.reject(new Error('Ошибка'))
            }
                return value.json();
        })
        .then(function(output){
            let jsonData = JSON.parse(output.feed.entry[0].gs$cell.$t)
            jsonData.forEach(e => {usernames.push(e.username)})
            loginRequest = () => {
                event.preventDefault()
            
                const username = document.querySelector('#username')
                username.oninput = function() { this.style.backgroundColor = '' }
                const password = document.querySelector('#password')
                password.oninput = function() { this.style.backgroundColor = '' }
            
                if (usernames.includes(username.value) && password.value) {
                    document.querySelector('.container').classList.add('animate__animated', 'animate__bounceOutLeft');
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
                        jsonData = JSON.parse(output.feed.entry[0].gs$cell.$t)
                        jsonData.forEach(e =>{if(e.id === password) {userData.push(e)} })
                        sessionStorage.setItem('userData', JSON.stringify(userData[0]))
                        document.querySelector('.container').remove()
                        document.querySelector('.help').remove()
                        window.location = '/web_components/main_screen/#user_info'
                    })
                }
                else {
                    if (!usernames.value || !usernames.includes(username.value)) {
                        username.style.backgroundColor = '#f7cdd2'
                    }
                    if (!password.value) {
                        password.style.backgroundColor = '#f7cdd2'
                    }
                }
            }
            requestNewAcc = () => {
                event.preventDefault()
            
                document.querySelector('.login__form').style.display = 'none';
                document.querySelector('.help').style.display = 'none'
            
                const br = document.createElement('br')
                const br2 = document.createElement('br')
                const requestContainer = document.createElement('div')
                requestContainer.className = 'container request__form'
                const title = document.createElement('div')
                title.className = 'title'
                title.innerText = 'New account'
                const requestForm = document.createElement('form')
                const username = document.createElement('input')
                username.placeholder = 'New username'
                username.id = 'newUsername'
                username.oninput = function() {
                    this.style.backgroundColor = ''
                }
                const password = document.createElement('input')
                password.id = 'newPassword'
                password.oninput = function() {
                    this.style.backgroundColor = ''
                }
                password.placeholder = 'New password'
                password.type = 'password'
                const password2 = document.createElement('input')
                password2.id = 'newPassword2'
                password2.oninput = function() {
                    this.style.backgroundColor = ''
                }
                password2.placeholder = 'Repeat password'
                password2.type = 'password'
                const createBtn = document.createElement('button')
                createBtn.onclick = () => { createNewAcc() }
                createBtn.innerText = 'Create'
                createBtn.id = 'create'
                const cancelBtn = document.createElement('button')
                cancelBtn.onclick = () => {
                    event.preventDefault()
            
                    document.querySelector('.login__form').style.display = 'block'
                    document.querySelector('.help').style.display = 'block'
                    requestContainer.remove()
                }
                cancelBtn.innerText = 'Cancel'
                cancelBtn.id = 'cancel'
                requestContainer.appendChild(title)
                requestForm.appendChild(br)
                requestForm.appendChild(username)
                requestForm.appendChild(password)
                requestForm.appendChild(password2)
                requestForm.appendChild(br2)
                requestForm.appendChild(createBtn)
                requestForm.appendChild(cancelBtn)
                requestContainer.appendChild(requestForm)
                document.body.appendChild(requestContainer)
            }
            createNewAcc = () => {
                event.preventDefault()
            
                let newUsername = document.querySelector('#newUsername')
                let newPassword = document.querySelector('#newPassword')
                let newPassword2 = document.querySelector('#newPassword2')
                
                if (newUsername.value
                    && newPassword.value.length > 3
                    && newPassword.value === newPassword2.value
                    && !usernames.includes(newUsername.value)) {
                    usernames.push(newUsername.value)
            
                    document.querySelector('.request__form').remove()
                    
                    setTimeout(() => {
                        document.querySelector('.login__form').style.display = 'block'
                    }, 2500)   
                }
                else {
                    if (!newUsername.value
                        || usernames.includes(newUsername.value)) {
                        newUsername.style.backgroundColor = '#f7cdd2'
                    }
                    if (newPassword.value.length < 4) {
                        newPassword.style.backgroundColor = '#f7cdd2'
                        newPassword2.style.backgroundColor = '#f7cdd2'
                    }
                    if (newPassword.value != newPassword2.value) {
                        newPassword2.style.backgroundColor = '#f7cdd2'
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
                    about.innerText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
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
        })
}