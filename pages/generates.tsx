import { Button, Col, Form, Input, message, Row, Space } from "antd";
import Head from "next/head";
import React from "react";
import useCopyToClipboard from "../utils/copyToClipboard";
const AdminPage = () => {
  const [form] = Form.useForm();
  const url = "https://www.april-andhika-wedding.my.id";
  const [, copy] = useCopyToClipboard();
  return (
    <div className="container">
      <Head>
        <title>Generate Invitation</title>
      </Head>
      <Row>
        <Col lg={12} md={8} sm={24} className="left" />
        <Col lg={12} md={16} sm={24} className="right">
          <h1>Generate Link Invitation</h1>
          <Form
            layout="vertical"
            form={form}
            name="control-hooks"
            // onFinish={onFinish}
          >
            <Form.Item name="name" label="Nama" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="wa"
              label="Nomor WhatsApp"
              rules={[{ required: false }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                onClick={() => {
                  const urls =
                    url +
                    "?to=" +
                    encodeURIComponent(form.getFieldValue("name"));
                  copy(urls).then(() => {
                    message.success("Berhasil tersalin!");
                  });
                }}
                htmlType="submit"
                style={{ marginRight: 10, marginBottom: 10, width: "100%" }}
              >
                Generate Link Only & Copy
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  const urls =
                    url +
                    "?to=" +
                    encodeURIComponent(form.getFieldValue("name"));
                  const greetings: string = `Bismillahirrahmanirrahim\nAssalamu'alaikum Warahmatullahi wabarakatuh\n\nTanpa mengurangi rasa hormat, melalui undangan ini kami memohon doa restu sekaligus mengundang Bapak/Ibu/Saudara/i untuk menghadiri Resepsi pernikahan kami yang Insya Allah akan dilaksanakan pada hari :\nSabtu, 26 November 2022\n\nBersama dengan ini kami sertakan undangan pernikahan kami secara virtual.\nLink undangan:\n\n${urls}
                \nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dengan mengikuti protokol kesehatan pencegahan penyebaran Covid-19.\nAtas perhatiannya, kami mengucapkan terima kasih.\n\nWassalamu'alaikum Warahmatullahi Wabarakatuh\n\nSalam,\nApril & Andhika`;
                  copy(greetings).then(() => {
                    message.success("Berhasil tersalin!");
                  });
                }}
                htmlType="submit"
                style={{ marginRight: 10, marginBottom: 10, width: "100%" }}
              >
                Generate Link With Greeting & Copy
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                onClick={() => {
                  const waNumber = form.getFieldValue("wa");
                  const waNumberReplaced =
                    waNumber[0] !== "6"
                      ? waNumber
                          .replace(waNumber[0], waNumber[0] === "0" ? "62" : "")
                          .replace(/-/g, "")
                      : waNumber.replace(/-/g, "");

                  const urls =
                    url +
                    "?to=" +
                    encodeURIComponent(form.getFieldValue("name"));
                  const greetings: string = `Bismillahirrahmanirrahim\nAssalamu'alaikum Warahmatullahi wabarakatuh\n\nTanpa mengurangi rasa hormat, melalui undangan ini kami memohon doa restu sekaligus mengundang Bapak/Ibu/Saudara/i untuk menghadiri Resepsi pernikahan kami yang Insya Allah akan dilaksanakan pada hari :\nSabtu, 26 November 2022\n\nBersama dengan ini kami sertakan undangan pernikahan kami secara virtual.\nLink undangan:\n\n${urls}
                  \nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dengan mengikuti protokol kesehatan pencegahan penyebaran Covid-19.\nAtas perhatiannya, kami mengucapkan terima kasih.\n\nWassalamu'alaikum Warahmatullahi Wabarakatuh\n\nSalam,\nYovie & Brigita`;
                  const urlShare = `https://api.whatsapp.com/send?phone=${waNumberReplaced}&text=${encodeURIComponent(
                    greetings
                  )}`;
                  window?.open(urlShare, "_ blank");
                }}
                style={{ marginRight: 10, marginBottom: 10, width: "100%" }}
              >
                Share to WhatsApp
              </Button>
              <Button
                type="link"
                htmlType="button"
                onClick={() => form.resetFields()}
              >
                Clear Form
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AdminPage;
