# Auth Service

Dev env:

- URL=0.0.0.0:5001
- DATABASE_URL=postgres://yvydcvthgookwo:19424ae02200a9b18fb114d5e06773173b98332ea214491ecc9bb3986e6ae063@ec2-52-200-215-149.compute-1.amazonaws.com:5432/d1r92s758a7v7r

run command: <br/>
`docker-compose up`


## List of Endpoints

### Register

`POST /auth/register`

Request body

```json
{
  "fullName": "user example",
  "email": "user@example.com",
  "password": "user"
}
```

Response

* Successfully registered


  ```json
  {
    "status": 201
  }
  ```

* Email already registered

  ```json
  {
    "status": 409,
    "error": [
      "E-Mail already exists"
    ]
  }
  ```

* Invalid email

  ```json
  {
    "status": 400,
    "error": [
      "email must be an email"
    ]
  }
  ```


### Register as Merchant

`POST /auth/registerMerchant`

Request body

```json
{
  "email": "merchant@example.com",
  "merchantName": "merchant example",
  "password": "merchant"
}
```

Response

* Successfuly registered

  ```json
  {
    "status": 201
  }
  ```

* Email already registered

  ```json
  {
    "status": 409,
    "error": [
      "E-Mail already exists"
    ]
  }
  ```

* Invalid email

  ```json
  {
    "status": 400,
    "error": [
      "email must be an email"
    ]
  }
  ```


### Login

`POST /auth/login`

Request Body

```json
{
  "email": "user@example.com",
  "password": "user"
}
```

Response

* Successfully login

  ```json
  {
    "status": 200,
    "token": <access-token>
  }
  ```

* No user with given email

  ```json
  {
    "status": 404,
    "error": [
      "E-Mail not found"
    ]
  }
  ```

* Wrong password

  ```json
  {
    "status": 404,
    "error": [
      "Wrong password"
    ]
  }
  ```

* Invalid email

  ```json
  {
    "status": 400,
    "error": [
      "email must be an email"
    ]
  }
  ```
