# AddressQR
QR code write/read to leave your address for contact tracing.

## Screenshots
<p align="center">
  <img src="https://user-images.githubusercontent.com/31488172/87227927-346c8e00-c39e-11ea-8311-4162cccfbc18.gif" width="60%>
</p>

##Quickstart

1. Download the repo

```
git pull https://github.com/locomocoroco/addressQR.git
``` 

2. Install the dependecies
```
npm install or yarn install
```

3. Place your .env into root
```
!!!Replace values!!!
NODE_ENV= development || production
PORT=Your favorite port
DBNAME=A dbname of your choosing
DBPORT=The port of your mongoDB instance
SALT=Saltrounds
SECRETKEY=JWT secret
```
4. Get started
```
Starting the Server:
-> cd server && env $(cat .env) npx nodemon

Starting the client:
-> You can use Xcode or Android Studio for a guided experience
-> or i would refer you to the CLI docs: https://reactnative.dev/docs/environment-setup

5. Have fun with it!


## Techstack
React-Native
MongoDB
mongoose
QRCode technology

## Author
Nils Wernecke - [Github](https://github.com/locomocoroco) - [LinkedIn](https://www.linkedin.com/in/niwern/)


## License

This project is licensed under the MIT License.
