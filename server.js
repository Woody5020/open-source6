const express=require("express");
const app=express();

const { MongoClient }=require("mongodb");

let db;

const url="mongodb+srv://id:password@name.ingmpyt.mongodb.net/?retryWrites=true&w=majority&appName=name";

new MongoClient(url).connect().then(client => {
	console.log("DB connect success.");

	db=client.db("portfolio");

	app.listen(8080, () => {
		console.log("http://localhost:8080");
	});
}).catch(error => {
	console.log(error);
});

app.use(express.static(__dirname+"/public"));

app.set("view engine", "ejs");


app.get("/", async (request, response) => {
	let result=await db.collection("data1").find().toArray();
	console.log(result);
	// response.render("footer.ejs", {items-> result값은 사용자 정의로 : result});
	response.render("footer.ejs",{news:result});
});