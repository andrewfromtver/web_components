let usernames = []

window.onload = () => {
    if (sessionStorage.userData) {
        window.location = '/web_components/main_screen'
    }
    document.title = 'Login'
    usernames = ['demo']
}

loginRequest = () => {
    event.preventDefault()

    const username = document.querySelector('#username')
    username.oninput = function() { this.style.backgroundColor = '' }
    const password = document.querySelector('#password')
    password.oninput = function() { this.style.backgroundColor = '' }

    if (usernames.includes(username.value) && password.value) {
        document.querySelector('.container').classList.add('animate__animated', 'animate__bounceOutLeft');
        setTimeout(() => {
            let userData = {
                'photo': null,
                'name': 'Jhon',
                'surname': 'Doe',
                'age': 33,
                'ocupation': 'Project manager',
                'subscribed': true,
                'phone': '+7 900 111 22 33',
                'email': 'email@company.com',
                'site': 'https://demo.com',
                'social': 'https://link_to_social.network',
                'activities': [12, 19, 3, 5],
                'total': [4, '12 hours', 3, '125 unit & 23 manual'],
                'subjects': [
                    {
                        'id': 1,
                        'description': '1',
                        'priority': 'highest',
                        'type': 'cr'
                    },
                    {
                        'id': 2,
                        'description': '2',
                        'priority': 'medium',
                        'type': 'task'
                    },
                    {
                        'id': 3,
                        'description': '3',
                        'priority': 'low',
                        'type': 'bug'
                    },
                    {
                        'id': 4,
                        'description': '4',
                        'priority': 'lowest',
                        'type': 'task'
                    },
                    {
                        'id': 5,
                        'description': '5',
                        'priority': 'high',
                        'type': 'cr'
                    }
                ]
            }
            sessionStorage.setItem('userData', JSON.stringify(userData))
            document.querySelector('.container').remove()
            document.querySelector('.help').remove()
            window.location = '/web_components/main_screen/#user_info'
        }, 450)
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