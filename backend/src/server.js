import express from "express";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import cors from "cors";
import { InputError, AccessError } from "./error";
import swaggerDocument from "../swagger.json";
import { Pool } from "pg";
import config from "./config";
import bcrypt from "bcrypt";
import {
  getEmailFromAuthorization,
  login,
  register,
  checkClientAuth,
  complete_reg,
  create_user,
  create_client,
  delete_support,
  get_clients,
  get_client,
  get_images,
  add_image,
  delete_user,
  delete_image,
  updateProfilePicture,
  update_user_profile,
  new_support,
  get_client_support,
} from "./service";

const app = express();

export const pool = new Pool(config);

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
  // console.log("Authorization header:", req.header("Authorization"));
  const email = await getEmailFromAuthorization(req.header("Authorization"));
  await fn(req, res, email);
};

app.get(
  "/authenticate",
  catchErrors(
    authed(async (req, res, email) => {
      return res.json({ authenticated: true });
    })
  )
);

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
      await complete_reg(
        email,
        profession,
        country,
        postcode,
        date,
        isSubscribed
      );
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
      const {
        name,
        dob,
        postcode,
        communication,
        interests,
        environments,
        profilePicture,
      } = req.body;
      const user_id = await create_user(
        name,
        dob,
        postcode,
        communication,
        interests,
        environments,
        profilePicture
      );
      await create_client(email, user_id);
      return res.json({});
    })
  )
);

app.put(
  "/update_user_profile/:profileID",
  catchErrors(
    authed(async (req, res, email) => {
      const { profileID } = req.params;
      const { name, snapshot, interests, comm_env } = req.body;

      // Ensure the user has access to modify this profile
      const authRows = await checkClientAuth(email, profileID);
      if (authRows.length === 0) {
        throw new AccessError("You do not have access to this client.");
      }

      // Update the profile
      await update_user_profile(profileID, name, snapshot, interests, comm_env);
      return res.json({ message: "Profile updated successfully" });
    })
  )
);

app.post(
  "/admin/update_user_profilepicture/:profileID",
  catchErrors(
    authed(async (req, res, email) => {
      const { profileID } = req.params;
      const { profilePicture } = req.body;
      await updateProfilePicture(profileID, profilePicture);
      return res.json({ message: "Profile picture updated successfully" });
    })
  )
);

app.get(
  "/get_clients",
  catchErrors(
    authed(async (req, res, email) => {
      return res.json({ clients: await get_clients(email) });
    })
  )
);

app.get(
  "/get_client/:profileID",
  catchErrors(
    authed(async (req, res, email) => {
      const { profileID } = req.params;
      return res.json({ client: await get_client(email, profileID) });
    })
  )
);

app.delete(
  "/admin/delete_user/:user_id",
  catchErrors(
    authed(async (req, res, email) => {
      const { user_id } = req.params;
      await delete_user(email, user_id); // Delete user function
      return res.json({ message: "Profile deleted successfully" });
    })
  )
);

app.get(
  "/admin/auth/get_user_settings",
  catchErrors(
    authed(async (req, res, email) => {
      const result = await pool.query(
        'SELECT full_name, email, dob, location, postcode, profession, is_subbed FROM "Professionals" WHERE email = $1',
        [email]
      );
      if (result.rows.length === 0) {
        throw new InputError("Professional not found.");
      }
      console.log(result.rows[0]);
      return res.json(result.rows[0]);
    })
  )
);

app.put(
  "/admin/auth/update_user_settings",
  catchErrors(
    authed(async (req, res, email) => {
      const { full_name, dob, location, postcode, profession, is_subbed } = req.body;
      const queryText = `
        UPDATE "Professionals"
        SET full_name = $2, dob = $3, location = $4, postcode = $5, profession = $6, is_subbed = $7
        WHERE email = $1;
      `;
      const values = [email, full_name, dob, location, postcode, profession, is_subbed];
      await pool.query(queryText, values);
      return res.json({ message: "Settings updated successfully" });
    })
  )
);

app.put(
  "/admin/auth/change_password",
  catchErrors(
    authed(async (req, res, email) => {
      const { currentPassword, newPassword } = req.body;

      // Get the current hashed password from the database
      const result = await pool.query(
        'SELECT password FROM "Professionals" WHERE email = $1',
        [email]
      );
      if (result.rows.length === 0) {
        throw new InputError("User not found.");
      }

      // Verify current password
      const isPasswordValid = await bcrypt.compare(currentPassword, result.rows[0].password);
      if (!isPasswordValid) {
        throw new InputError("Current password is incorrect.");
      }

      // Hash new password and update
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await pool.query(
        'UPDATE "Professionals" SET password = $1 WHERE email = $2',
        [hashedNewPassword, email]
      );

      return res.json({ message: "Password updated successfully" });
    })
  )
);

/***************************************************************
                      Images Functions
***************************************************************/

app.get(
  "/get_images/:profileID",
  catchErrors(
    authed(async (req, res, email) => {
      const { profileID } = req.params;
      return res.json({ images: await get_images(email, profileID) });
    })
  )
);

app.post(
  "/add_image/:profileID",
  catchErrors(
    authed(async (req, res, email) => {
      const { profileID } = req.params;
      const { image } = req.body;
      await add_image(email, profileID, image);
      return res.json({});
    })
  )
);

app.delete(
  "/delete_image/:img_id",
  catchErrors(
    authed(async (req, res, email) => {
      const { img_id } = req.params;
      await delete_image(email, img_id); // Call to service layer
      return res.json({ message: "Image deleted successfully" });
    })
  )
);

/***************************************************************
                      Supports Functions
***************************************************************/
app.post(
  "/new_support/:profileID",
  catchErrors(
    authed(async (req, res, email) => {
      const { profileID } = req.params;
      const {
        text,
        image,
        value,
        stepImages,
        stepNames,
        stepTimes,
        category,
        isHorizontal,
      } = req.body;
      await new_support(
        email,
        profileID,
        text,
        image,
        value,
        stepImages,
        stepNames,
        stepTimes,
        category,
        isHorizontal
      );
      return res.json({});
    })
  )
);

app.get(
  "/get_client_support/:profileID",
  catchErrors(
    authed(async (req, res, email) => {
      const { profileID } = req.params;
      return res.json({ client: await get_client_support(email, profileID) });
    })
  )
);

app.delete(
  "/delete_support/:supportID",
  catchErrors(
    authed(async (req, res, email) => {
      // console.log(
      //   `Delete request received for supportID: ${req.params.supportID} by user: ${email}`
      // );

      const { supportID } = req.params;
      if (!supportID) {
        console.log("No support ID provided in request.");
        return res.status(400).json({ error: "Support ID is required" });
      }

      try {
        await delete_support(email, supportID);
        console
          .log
          // `Support ${supportID} deleted successfully by user ${email}`
          ();
        return res.json({ message: "Support deleted successfully" });
      } catch (error) {
        console.log(
          `Failed to delete support ${supportID} for user ${email}:`,
          error.message
        );
        throw error;
      }
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
