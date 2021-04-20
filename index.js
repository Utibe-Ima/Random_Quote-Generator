const express = require('express');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.json());

function shuffleArray(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random()*(max - min +1) + min);
}
 
app.get('/', (req, res) => {
	fs.readFile('./json/qoute.json', 'utf8', (err, jsonFile) => {
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


app.listen(PORT, () => {
	console.log(`The server is running on port ${PORT}`)
});