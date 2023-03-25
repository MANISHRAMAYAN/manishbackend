require("dotenv").config();
const express= require("express");
const authmiddleWare = require("./src/middleware/AuthMiddleware");
const a=require("./src/routes/AuthRoutes")
const cors=require("cors")
const employee=require("./src/routes/EmployeeRoutes");

const grandAccess = require("./src/middleware/grandAccess");

const helmet=require("helmet")
const xss = require("xss-clean")
const rateLimiter=require("express-rate-limit")
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs")
const swaggerDocument= YAML.load("./Swagger.yaml")




const app=express();

app.set("trust proxy", 1);
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 100,
		max: 100,
	})
);

app.use(cors())
app.use(helmet());
app.use(xss());


app.get("/", (req, res) => {
	res.send('<h1>employee API</h1><a href="/api-docs">Documentation</a>');
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));



// express.static(__dirname+'/public/')
app.use('/image',express.static(__dirname+'/public/upload/'))

app.use(express.json())


app.use("/auth",a)

app.use("/employee",authmiddleWare.verifyToken,employee)



module.exports=app;
