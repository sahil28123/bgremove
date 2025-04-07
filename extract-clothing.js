
import { Client } from "@gradio/client";

export default async function handler(req, res) {
  try {
    const { imageUrl, types } = req.body;

    const imageRes = await fetch(imageUrl);
    const blob = await imageRes.blob();

    const client = await Client.connect("sahilverma28/clothing-segmentation-app");

    const result = await client.predict("/extract_clothing", {
      image: blob,
      selected_types: types || ["upper"],
    });

    res.status(200).json({ status: "success", data: result.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}
