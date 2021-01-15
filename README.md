# Name Search app

This project is my exercise for Solita's Dev Academy program. It's NodeJS+React+Express app that has represents data from JSON file

# Frontend

UI is built by using React-Bootstrap and background has a react-partincle-js component running. Background is non-dynamic and cannot be interacted.
![Alt text](img/screenshot.jpg?raw=true "Name Search home")


# Express

Express runs in port 4000 and has three endpoints:

```
/getData	      GET    Returns all names. No sorting.
/getTotal	      GET    Returns total length of names.
/getSingle:name   GET    Returns first match with find() method.
```
Required features included getting names in borth alphabetical and popular form. These I did not seperate to different endpoints, instead implemented sorting method in to frontend.

# Structure

Name Search has a Panel component as the main parent. it includes all other components except the background particle animation. First it renders a Switch Router. These routes render corresponding HTML in returning statement of Panel.

Under Home case, are three selections, Listing Search, Total number search and Specific name search. 

## Listing 
Listing has group of radiobuttons that provides sorting options. List is re-rendered during and after search, allowing dynamic sorting without need of more APi requests.

## Total 
Total is the most simple request. It returns the length of the names object in names.json.

## Specific
Single name search. Returns matching name and amount. This could be developed further to allow multiple names - and depending on the json file, allow search by other keys (salary, company, title etc.)


# Running Name Search


First install all dependencies by:

```
npm install
```

After that start express server in root directory:

```
nodemon .\express.js
```

And then launch the application in root:

```
npm start
```
Name Search opens in port 3000 while the express runs in port 4000.


## Error handling

Name search runs independently without express but will produce error if endpoints are called. Error messages are also logged.


