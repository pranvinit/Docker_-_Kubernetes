import { app } from "./app";
import { connectDB } from "./db/connect";
const port = process.env.PORT || 5000;

app.listen(port, async () => {
  await connectDB();
  console.log(`Auth service running on port ${port}`);
});
