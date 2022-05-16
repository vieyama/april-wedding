import { Button, Card, Col, Form, Input, message, Row } from "antd";
import { useRouter } from "next/router";
import Head from "next/head";
import React, { useRef, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import useCopyToClipboard from "../utils/copyToClipboard";
const AdminPage = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const url = "https://www.brisya-wedding.my.id";
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
              rules={[{ required: true }]}
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
                  const greetings: string = `Bismillahirrahmanirrahim\nAssalamu'alaikum Warahmatullahi wabarakatuh\n\nTanpa mengurangi rasa hormat, melalui undangan ini kami memohon doa restu sekaligus mengundang Bapak/Ibu/Saudara/i untuk menghadiri Resepsi pernikahan kami yang Insya Allah akan dilaksanakan pada hari :\nMinggu, 24 Juli 2022\n\nBersama dengan ini kami sertakan undangan pernikahan kami secara virtual.\nLink undangan:\n\n${urls}
                \nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dengan mengikuti protokol kesehatan pencegahan penyebaran Covid-19.\nAtas perhatiannya, kami mengucapkan terima kasih.\n\nWassalamu'alaikum Warahmatullahi Wabarakatuh\n\nSalam,\nYovie & Brigita`;
                  copy(greetings).then(() => {
                    message.success("Berhasil tersalin!");
                  });
                }}
              >
                Generate Link & Copy
              </Button>
              <Button
                htmlType="button"
                onClick={() => {
                  const urls =
                    url +
                    "?to=" +
                    encodeURIComponent(form.getFieldValue("name"));
                  const greetings: string = `Bismillahirrahmanirrahim\nAssalamu'alaikum Warahmatullahi wabarakatuh\n\nTanpa mengurangi rasa hormat, melalui undangan ini kami memohon doa restu sekaligus mengundang Bapak/Ibu/Saudara/i untuk menghadiri Resepsi pernikahan kami yang Insya Allah akan dilaksanakan pada hari :\nMinggu, 24 Juli 2022\n\nBersama dengan ini kami sertakan undangan pernikahan kami secara virtual.\nLink undangan:\n\n${urls}
                \nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dengan mengikuti protokol kesehatan pencegahan penyebaran Covid-19.\nAtas perhatiannya, kami mengucapkan terima kasih.\n\nWassalamu'alaikum Warahmatullahi Wabarakatuh\n\nSalam,\nYovie & Brigita`;
                  const urlShare = `https://api.whatsapp.com/send?phone=${form.getFieldValue(
                    "wa"
                  )}&text=${encodeURIComponent(greetings)}`;
                  window?.open(urlShare, "_ blank");
                }}
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
