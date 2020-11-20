# Trabajo práctico de Arquitectura Web

 - **Alumno**: Diego Ginko 
 - **Tema**: Notas personales (Como Google Keep o una TODO List)

## ToDo

 - [x] Crear repositorio MongoDB
 - [x] CRUD
 - [x] Almacenamiento en repositorio MongoDB
 - [x] API de backend expuesta

 ## Resumen

 La finalidad de la API es dar acceso al almacenamiento, busqueda y eliminacion de notas personales, las cuales tienen la posibilidad de tener un tag para ordenarlas en aplicaciones. El acceso a la API es mediante un registro el cual posibilita el login que devuelve un JWT el cual tiene que ser usado para interactuar con las notas.

 ## Instalacion

 La API esta creada en Node.js utilizando Express entre otros, por lo que para poder funcionar va a necesitar que Node este instaladom los modulos pueden verse en package.json.

 ### Variables de entorno

 Se requieren dos variables de entorno para que funcione la API

 ```
DB_CONNECTION=<STRING DE CONEXION A MONGODB>
 ```

  ```
TOKEN_SECRET=<SECRET PARA GENERAR EL JWT>
 ```

 ## Endpoints

 ### Auth

 #### POST /v1/auth/register
 Realiza el registro de un nuevo usuario

BODY
```
{
    "name": "nombreDeUsuario",
    "email": "direccionDe@email.com",
    "password": "contraseña"
}
```
 
RESPUESTA

Se devolvera un JSON con el id del usuario creado en caso de exito, de lo contrario se devolvera el mensaje de error correspondiente
```
{
    "_id": "5fb742e982e1211cc0e729af"
}
```


 #### POST /v1/auth/login
 Realiza el login de un usuario existente

 BODY
 ```
{
    "email": "direccionDe@email.com",
    "password": "contraseña"
}
 ```
 RESPUESTA

 Se devolvera el JWT para ser utilizado en la API, caso contrario mostrara el error correspondiente
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI3NDJlOTgyZTEyMTFjYzBlNzI5YWYiLCJpYXQiOjE2MDU4NDU3NzV9.M4EmVjSgX8EJJfkqz7oJZU9aIXlZullA3TYrxeXGqH0
```

 ### Notes

 #### GET /v1/notes/

 Trae todas las notas correspondientes al usuario dueño del JWT

 HEADER
 ```
 'auth-token' = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI3NDJlOTgyZTEyMTFjYzBlNzI5YWYiLCJpYXQiOjE2MDU4NDU3NzV9.M4EmVjSgX8EJJfkqz7oJZU9aIXlZullA3TYrxeXGqH0
 ```

 RESPUESTA
 ```
 [
    {
        "_id": "5fb723791167870ee03f406a",
        "title": "asd",
        "description": "asd123",
        "user": "5fb6817f12c25d03a021b1a6",
        "tag": "WORK",
        "date": "2020-11-20T02:01:29.862Z",
        "__v": 0
    }
]
 ```

 #### GET /v1/notes/{noteId}
 Trae la nota segun id correspondiente al usuario dueño del JWT

HEADER
 ```
 'auth-token' = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI3NDJlOTgyZTEyMTFjYzBlNzI5YWYiLCJpYXQiOjE2MDU4NDU3NzV9.M4EmVjSgX8EJJfkqz7oJZU9aIXlZullA3TYrxeXGqH0
 ```

RESPUESTA
```
{
    "_id": "5fb723791167870ee03f406a",
    "title": "asd",
    "description": "asd123",
    "user": "5fb6817f12c25d03a021b1a6",
    "tag": "WORK",
    "date": "2020-11-20T02:01:29.862Z",
    "__v": 0
}
```

#### POST /v1/notes/
Crea una nota para el usuario dueño del JWT

HEADER
 ```
 'auth-token' = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI3NDJlOTgyZTEyMTFjYzBlNzI5YWYiLCJpYXQiOjE2MDU4NDU3NzV9.M4EmVjSgX8EJJfkqz7oJZU9aIXlZullA3TYrxeXGqH0
 ```

BODY
 ```
{
    "title": "asd",
    "description": "asd123",
    "tag": "WORK"
}
 ```

RESPUESTA

Si se creo exitosamente, devuelve la nota creada
```
{
    "_id": "5fb723791167870ee03f406a",
    "title": "asd",
    "description": "asd123",
    "user": "5fb6817f12c25d03a021b1a6",
    "tag": "WORK",
    "date": "2020-11-20T02:01:29.862Z",
    "__v": 0
}
```

#### PATCH /v1/notes/{noteId}
Actualiza una nota segun su id

HEADER
 ```
 'auth-token' = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI3NDJlOTgyZTEyMTFjYzBlNzI5YWYiLCJpYXQiOjE2MDU4NDU3NzV9.M4EmVjSgX8EJJfkqz7oJZU9aIXlZullA3TYrxeXGqH0
 ```

 BODY
 ```
{
    "title": "asd",
    "description": "asd123",
    "tag": "WORK"
}
 ```

RESPUESTA

Si se actualizo exitosamente, devuelve la informacion de la actualizacion
```
{
    "n": 1,
    "nModified": 1,
    "opTime": {
        "ts": "6897061773308854274",
        "t": 2
    },
    "electionId": "7fffffff0000000000000002",
    "ok": 1,
    "$clusterTime": {
        "clusterTime": "6897061773308854274",
        "signature": {
            "hash": "rGiOQXCP1fmm1qb9PixMwogfJEA=",
            "keyId": "6893985039126626307"
        }
    },
    "operationTime": "6897061773308854274"
}
```

#### DELETE /v1/notes/{noteId}

Elimina una nota segun su id

HEADER
 ```
 'auth-token' = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI3NDJlOTgyZTEyMTFjYzBlNzI5YWYiLCJpYXQiOjE2MDU4NDU3NzV9.M4EmVjSgX8EJJfkqz7oJZU9aIXlZullA3TYrxeXGqH0
 ```


RESPUESTA

Si se elimino exitosamente, devuelve la informacion de la eliminacion
```
{
    "n": 1,
    "opTime": {
        "ts": "6897062460503621634",
        "t": 2
    },
    "electionId": "7fffffff0000000000000002",
    "ok": 1,
    "$clusterTime": {
        "clusterTime": "6897062460503621634",
        "signature": {
            "hash": "8EPHCo6ekWbv4GzrbBcdGUSCSOc=",
            "keyId": "6893985039126626307"
        }
    },
    "operationTime": "6897062460503621634",
    "deletedCount": 1
}
```

#### GET /v1/notes/{tag}
Trae todas las notas segun TAG correspondiente al usuario dueño del JWT

HEADER
 ```
 'auth-token' = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI3NDJlOTgyZTEyMTFjYzBlNzI5YWYiLCJpYXQiOjE2MDU4NDU3NzV9.M4EmVjSgX8EJJfkqz7oJZU9aIXlZullA3TYrxeXGqH0
 ```

RESPUESTA
```
[
    {
        "_id": "5fb74a54eb0d5952e4ef3fee",
        "title": "asd",
        "description": "asd123",
        "user": "5fb742e982e1211cc0e729af",
        "tag": "WORK",
        "date": "2020-11-20T04:47:16.623Z",
        "__v": 0
    },
    {
        "_id": "5fb74a56eb0d5952e4ef3fef",
        "title": "asd",
        "description": "asd123",
        "user": "5fb742e982e1211cc0e729af",
        "tag": "WORK",
        "date": "2020-11-20T04:47:18.183Z",
        "__v": 0
    }
]
```