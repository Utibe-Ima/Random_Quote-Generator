const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
const filePath = './json/qoute.json'

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

function shuffleArray(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random()*(max - min +1) + min);
} 
 
app.get('/', (req, res) => {
	fs.readFile(filePath, 'utf8', (err, jsonFile) => {
		let jsonData = JSON.parse(jsonFile);
		let maxValue = jsonData.length - 1;
		let randomValue = shuffleArray(0, maxValue);
		let randomQoute = jsonData[randomValue];
		res.render("template", {
			qoute: randomQoute.qoute,
			author: randomQoute.author
		 })
	})
});

app.get('/api/qoute', (req, res) => {
	fs.readFile(filePath, 'utf8', (err, data) => {
		let result = JSON.parse(data);
		res.send(result);
	})
});

app.post('/api/qoute', (req, res) => {
 
	let newQoute = req.body;

	 fs.readFile(filePath, 'utf8', (err, content) => {
	 	var arr = JSON.parse(content);
	 	arr.push(newQoute);
	 	var sendArr = JSON.stringify(arr)
	 	res.send(sendArr);

	 	fs.writeFile(filePath, sendArr, (err) => {
	 		console.log('Qoute has been added');
	 	})
	 })
});

app.put('/api/qoute', (req, res) => {
	fs.readFile(filePath, 'utf8', (err, data) => {
		let newData = JSON.parse(data);
		let qouteToBeReplaced = req.body.id;
		let newID = parseInt(qouteToBeReplaced);
		let newQouteItem = req.body.qoute;
		let newAuthorItem = req.body.author;
		newData[newID].qoute = newQouteItem;
		newData[newID].author = newAuthorItem;
		let sendNewData = JSON.stringify(newData);
		res.send(sendNewData);
		
		fs.writeFile(filePath, sendNewData, (err) => {
			console.log('successful');
		})

	})
});

app.delete('/api/qoute', (req, res)=> {
	fs.readFile(filePath, 'utf8', (err, fileContent) => {
		let readFile = JSON.parse(fileContent);
		let arrIndex = req.body.id;
		let id = parseInt(arrIndex); 
		readFile.splice(id, 1)
		let newFile = JSON.stringify(readFile)

		fs.writeFile(filePath, newFile, (err) => {
			res.send(readFile);
			console.log('Qoute has been deleted');
		})
	});
});


app.listen(PORT,()=>console.log(PORT));