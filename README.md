# Amaris
## Stack de tecnologias
- Nest JS / Backend
- React / Frontend
- MongoDB
## Backend
- Para la persistencia de datos elegí Mongodb debido a un error en la facturación con Amazon, por lo que no fue posible utilizar Dynamo.
- Instrucciones de uso e instalación
    - Ingresar a la carpeta amaris-back
    - Correr el comando en consola -> `npm install` o `pnpm install` (Solo si se tiene instalado pnpm)
    - Correr el comando en consola -> `npm run start:dev` o `pnpm start:dev`
    - Con esto la api quedara expuesta en el puerto 3000 -> `http://localhost:3000`
    - Este [JSON](https://drive.google.com/file/d/1a79kS4At0CnC3sgsrGQVGJXK7uKooTh0/view?usp=sharing) se puede importar en POSTMAN creando un archivo con la data y extension .json
    

## Frontend
- Instrucciones de uso e instalación
    - Ingresar a la carpeta amaris-front
    - Correr el comando en consola -> `npm install` o `pnpm install`
    - Correr el comando en consola -> `npm run dev` o `pnpm run dev`
    - La aplicación web quedara expuesta en el puerto 5173 -> `http://localhost:8000/` En caso de tener el puerto ocupado la consola dira el puerto a utilizar
    - El frontend esta compuesto por las siguientes pantallas:
        - Login
        - <img width="700" alt="image" src="https://github.com/teolopera/amaris-test/assets/57055764/41263a71-afd7-4195-bb68-b2a47b49de61">
        - Register
        - <img width="700" alt="image" src="https://github.com/teolopera/amaris-test/assets/57055764/0825f797-5cd3-4e26-947a-f6ad2d9aa224">
        - <img width="700" alt="image" src="https://github.com/teolopera/amaris-test/assets/57055764/577c4537-4fcd-448c-ae2c-aafed86e3626">
        - User
        - <img width="700" alt="image" src="https://github.com/teolopera/amaris-test/assets/57055764/16060cbe-50b7-47c7-91f5-215c2861dfa7">
        - Or without user
        - <img width="700" alt="image" src="https://github.com/teolopera/amaris-test/assets/57055764/e0a2d036-6fb5-4c6b-994d-212edca9ce06">


