import db from "../../../utils/db";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  try {
    const guest = await db.collection("april-guest").orderBy("created").get();
    const guestData = guest.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
    res.status(200).json({ guestData });
  } catch (e) {
    res.status(400).end();
  }
};
