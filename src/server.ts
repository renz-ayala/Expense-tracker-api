import dotenv from "dotenv";
dotenv.config();

import app from './app';

const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})