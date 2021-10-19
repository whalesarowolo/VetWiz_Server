# Vetwiz-server

### Installation
* First intsall node and npm. Get installation instructions from https://nodejs.org/
* Install typescript globally using _npm i -g typescript_
* Clone the repo
* Install all packages using _npm i_ or _npm install_

### Routes
##### User Routes
* User Registration: _{baseUrl}/api/v1/register_
* User Login: _{baseUrl}/api/v1/login_

##### Topup Routes
* initialize Topup: _{baseUrl}/api/v1/paystack/topup_
* Verify topup: _{baseUrl}/api/v1/topup/verify/:reference_

##### Forum Routes
* Add Forum Topic: _{baseUrl}/api/v1/forum/web/save-topic_
```
const data = {
    title: 'The Topic Title',
    description: 'The topic description'
}
formData = new FormData()
formData.append('values', JSON.stringify(data))
formData.append('file', imageFile)
fetch('https://vetwiz-server-alpha.herokuapp.com/api/v1/forum/web/save-topic', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer append user token',
        'ContentType': 'appliation/json',
    },
    body: formData
})
```
