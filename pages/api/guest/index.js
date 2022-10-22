import db from "../../../utils/db";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  try {
    const { id } = req.body;
    const entries = await db.collection("april-guest").get();
    const entriesData = entries.docs.map((item) => item.data());

    if (entriesData.some((item) => item.id === id)) {
      res.status(400).end();
    } else {
      const { id: idExisting } = await db.collection("april-guest").add({
        ...req.body,
        created: new Date().toISOString(),
      });
      res.status(200).json({ id: idExisting });
    }
  } catch (e) {
    res.status(400).end();
  }
};
