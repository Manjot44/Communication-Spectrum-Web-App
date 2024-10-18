import express from "express";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import cors from "cors";
import { InputError, AccessError } from "./error";
import swaggerDocument from "../swagger.json";
import {
  getEmailFromAuthorization,
  login,
  register,
  complete_reg,
  create_user,
  create_client,
  get_clients
} from "./service";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

const catchErrors = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    if (err instanceof InputError) {
      res.status(400).send({ error: err.message });
    } else if (err instanceof AccessError) {
      res.status(403).send({ error: err.message });
    } else {
      console.log(err);
      res.status(500).send({ error: "A system error ocurred" });
    }
  }
};

/***************************************************************
                       Auth Functions
***************************************************************/

const authed = (fn) => async (req, res) => {
  const email = await getEmailFromAuthorization(req.header("Authorization"));
  await fn(req, res, email);
};

app.post(
  "/admin/auth/login",
  catchErrors(async (req, res) => {
    const { email, password } = req.body;
    const token = await login(email, password);
    return res.json({ token });
  })
);

app.post(
  "/admin/auth/register",
  catchErrors(async (req, res) => {
    const { email, password, name } = req.body;
    const token = await register(email, password, name);
    return res.json({ token });
  })
);

app.put(
  "/admin/auth/complete_reg",
  catchErrors(
    authed(async (req, res, email) => {
      const { profession, country, postcode, date, isSubscribed } = req.body;
      await complete_reg(email, profession, country, postcode, date, isSubscribed);
      return res.json({});
    })
  )  
);


/***************************************************************
                    Support User Functions
***************************************************************/

app.post(
  "/admin/new_user",
  catchErrors(
    authed(async (req, res, email) => {
      const { name, dob, postcode, communication, interests, environments, profilePicture } = req.body;
      const user_id = await create_user(name, dob, postcode, communication, interests, environments, profilePicture);
      await create_client(email, user_id);
      return res.json({});
    })
  )
);

app.get(
  "/get_clients",
  catchErrors(
    authed(async (req, res, email) => {
      return res.json({ clients: await get_clients(email) })
    })
  )
);

/***************************************************************
                       Running Server
***************************************************************/

app.get("/", (req, res) => res.redirect("/docs"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = 5005;

const server = app.listen(port, () => {
  console.log(`Backend has started, now listening on port ${port}!`);
  // console.log(`For API docs, navigate to http://localhost:${port}`);
});

export default server;
