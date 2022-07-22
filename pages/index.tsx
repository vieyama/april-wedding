/* eslint-disable @next/next/no-img-element */
import {
  CalendarOutlined,
  EnvironmentFilled,
  FieldTimeOutlined,
  GiftOutlined,
  GoogleSquareFilled,
  HeartOutlined,
  InstagramOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Image,
  List,
  Modal,
  Row,
  Space,
  Form,
  Input,
  Radio,
  Avatar,
  Typography,
} from "antd";
import omit from "lodash/omit";
import HeaderComponent from "components/Header";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Countdown from "react-countdown";
import { useEffect, useState } from "react";
import useSound from "use-sound";

import getAcronym from "utils/acronym";
import { filter, isEmpty, toNumber } from "lodash";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const { Paragraph } = Typography;
const Home: NextPage = (props: any) => {
  const [guest, setGuest]: any = useState([]);

  const getData = async () => {
    await axios.get("/api/guest/guest").then((res: any) => {
      setGuest(filter(res?.data?.guestData, (e) => !isEmpty(e?.name)));
    });
  };

  useEffect(() => {
    getData();
  }, []);

  // const protocolData = [
  //   {
  //     img: "/protocol-covid/002-soap.png",
  //     text: "Para tamu wajib mencuci tangan atau menggunakan hand sanitizer sebelum memasuki area resepsi.",
  //   },
  //   {
  //     img: "/protocol-covid/001-mask.png",
  //     text: "Wajib menggunakan masker selama acara berlangsung.",
  //   },
  //   {
  //     img: "/protocol-covid/003-immune-system.png",
  //     text: "Tidak memiliki riwayat berkontak dengan pasien COVID-19.",
  //   },
  //   {
  //     img: "/protocol-covid/004-distance.png",
  //     text: "Saling menjaga jarak ketika menghadiri acara.",
  //   },
  //   {
  //     img: "/protocol-covid/005-thermometer.png",
  //     text: "Cek suhu ketika hendak memasuki ruangan acara.",
  //   },
  //   { img: "/protocol-covid/006-group.png", text: "Dilarang berkerumun." },
  // ];

  const data = [
    {
      img: "/gallery/photo_2022-05-17 10.49.06.jpeg",
    },
    {
      img: "/gallery/photo_2022-05-17 10.49.08.jpeg",
    },
    {
      img: "/gallery/photo_2022-05-17 10.49.09.jpeg",
    },
    {
      img: "/gallery/photo_2022-05-17 10.49.10.jpeg",
    },
    {
      img: "/gallery/photo_2022-05-17 10.49.11.jpeg",
    },
    {
      img: "/gallery/photo_2022-05-17 10.49.13.jpeg",
    },
    {
      img: "/gallery/photo_2022-05-17 10.49.14.jpeg",
    },
    {
      img: "/gallery/photo_2022-05-17 10.49.26.jpeg",
    },

    {
      img: "/gallery/photo_2022-05-17 10.49.25.jpeg",
    },
    {
      img: "/gallery/photo_2022-05-17 10.49.24.jpeg",
    },
    {
      img: "/gallery/photo_2022-05-17 10.49.21.jpeg",
    },
    {
      img: "/gallery/photo_2022-05-17 10.49.20.jpeg",
    },
  ];

  const Completionist = () => <span>You are good to go!</span>;

  const renderer: any = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      return (
        <Row gutter={[16, 16]} className="bank-container">
          <Col lg={6} md={6} sm={12} xs={12}>
            <Card className="countDownCard" title={days || 0} bordered>
              Days
            </Card>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Card className="countDownCard" title={hours || 0} bordered>
              Hours
            </Card>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Card className="countDownCard" title={minutes || 0} bordered>
              Minutes
            </Card>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Card className="countDownCard" title={seconds || 0} bordered>
              Seconds
            </Card>
          </Col>
        </Row>
      );
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [displayModal, setDisplayModal] = useState("");
  const showModal = (type?: any) => {
    setIsModalVisible(true);
    const src = type === "bca" ? "/bca.jpg" : "dana.jpg";
    setDisplayModal(src);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [playMusic, setPlayMusic] = useState(false);

  const [play, { stop }]: any = useSound("/music.mp3");

  useEffect(() => {
    if (playMusic) {
      play();
    } else {
      stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playMusic]);

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const data: any = {
      id: uuidv4(),
      ...omit(values, "countGuest"),
      ...(values?.countGuest !== undefined && {
        countGuest: toNumber(values?.countGuest),
      }),
    };

    await axios.post("/api/guest", data).then(() => {
      getData();
      form.resetFields();
    });
  };

  return (
    <div className="container">
      <Head>
        <title>Brisya&apos;s Wedding</title>
        <meta
          name="description"
          content="Wedding invitation of Yovie and Brigita."
        />
        <meta
          property="og:image"
          itemProp="image"
          content="/footerbg.png"
          key="ogimage"
        />
        <meta property="image" itemProp="image" content="/footerbg.png" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header Cover*/}
      <HeaderComponent setPlayMusic={setPlayMusic} playMusic={playMusic} />

      {/* Header Section */}
      <section
        style={{ background: "url(photo_bg.jpeg) center center no-repeat" }}
        className="curved page-holder bg-cover"
        id="particles-js"
        data-aos="zoom-in-up"
        data-aos-easing="ease-in-back"
        data-aos-delay="300"
      >
        <div className="title-wrapper title-section text-center">
          <img
            src="/flower.png"
            alt="ss"
            className="flower-img"
            data-aos="zoom-in-up"
          />
          <h2 className="greeting" data-aos="fade-up">
            The Wedding Of
          </h2>
          <h1 className="brides-name" data-aos="fade-up">
            Yovie & Brigita
          </h1>

          <h4 className="date" data-aos="fade-up">
            24 Juli 2022
          </h4>
        </div>
        <div className="custom-shape-divider-bottom-1610288749">
          <img
            src="https://datengdong.com/themes/winterblue/images/mask.png"
            alt=""
          />
        </div>
      </section>

      {/* protocol-covid */}
      <div
        className="protocol-section"
        data-aos="zoom-in-down"
        data-aos-duration="2000"
        data-aos-delay="300"
      >
        <h3 className="title">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</h3>
        <div className="protocol-text">
          <i>Assalamu&apos;alaikum Warrahmatullahi Wabarakatuh</i>
          <p>
            Dengan memohon Ridho dan Rahmat Allah SWT. Ya Allah, dengan segala
            kemurahan hati-Mu, kami hendak memohon Ridha-Mu, dan melaksanakan
            Sunnah Rasul-Mu, untuk menyelenggarakan acara pernikahan putra dan
            putri kami, untuk membentuk keluarga yang sakinah, mawaddah,
            warahmah.
          </p>
        </div>
      </div>

      {/* couple section */}
      <div className="couple-section">
        <img
          src="/flower.png"
          alt="ss"
          className="flower-img"
          data-aos="zoom-in-up"
          style={{ width: 170 }}
        />
        <h2
          className="brides"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          Yovie & Brigita
        </h2>
        <p style={{ fontSize: 20 }} data-aos="zoom-in-up">
          Are Getting Married
        </p>
        <Row>
          <Col
            lg={10}
            md={10}
            sm={24}
            xs={24}
            className="bride-man"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="2000"
            data-aos-delay="300"
          >
            <img src="/yovie.jpeg" alt="" className="bride-img" />
            <h2 className="name">Yovie</h2>
            <h2 className="fullname">Yovie Fesya Pratama</h2>
            <p>Putra dari Pasangan</p>
            <b>
              Bpk. A. Mustofa Yusuf & <br /> Ibu. Titi Idawati
            </b>
            <br />
            <Link href="https://www.instagram.com/yoviefp33/" passHref>
              <InstagramOutlined className="link" />
            </Link>
          </Col>
          <Col
            lg={4}
            md={4}
            sm={24}
            xs={24}
            style={{ alignSelf: "center", marginTop: 20, marginBottom: 20 }}
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="2000"
            data-aos-delay="300"
          >
            <span
              style={{
                fontSize: 80,
                fontFamily: "Ms Madi, cursive",
                fontWeight: "bold",
              }}
            >
              &
            </span>
          </Col>
          <Col
            lg={10}
            md={10}
            sm={24}
            xs={24}
            className="bride-woman"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="2000"
            data-aos-delay="300"
          >
            <img src="/brigita.jpeg" alt="" className="bride-img" />
            <h2 className="name">Brigita</h2>
            <h2 className="fullname">Brigita Adha Safira</h2>
            <p>Putri dari Pasangan</p>
            <b>
              Bpk. Kasim Isharyanto & <br /> Ibu. Sunarsih
            </b>
            <br />
            <Link href="https://www.instagram.com/brigitaas/" passHref>
              <InstagramOutlined className="link" />
            </Link>
          </Col>
        </Row>
      </div>

      <section
        className="location"
        style={{
          background:
            "url('/gallery/photo_2022-05-17 10.49.19.jpeg') center center no-repeat;background-size: cover",
        }}
      >
        <div className="custom-shape-divider-top-1610288850">
          <img
            src="https://datengdong.com/themes/winterblue/images/mask_bottom.png"
            alt="brush"
          />
        </div>
        <div className="container py-5">
          <img
            src="/flower.png"
            alt="list"
            style={{ width: 170 }}
            data-aos="fade-up"
            data-aos-easing="ease-in-back"
            data-aos-delay="300"
          />
          <div
            className="d-flex w-100 align-items-center justify-content-center mb-5 aos-init aos-animate"
            data-aos="fade-up"
            data-aos-easing="ease-in-back"
            data-aos-delay="300"
          >
            <h2
              className="caption"
              style={{ color: "#fff" }}
              data-aos="fade-up"
              data-aos-easing="ease-in-back"
              data-aos-delay="300"
            >
              Akad & Resepsi
            </h2>
            <Row
              style={{
                border: "1px solid",
                margin: 30,
                borderRadius: 15,
                padding: 20,
              }}
              data-aos="fade-up"
              data-aos-easing="ease-in-back"
              data-aos-delay="300"
            >
              <Col lg={12} md={12} sm={24} xs={24} className="date">
                <br />
                <CalendarOutlined style={{ fontSize: 20 }} />
                <h2>Minggu</h2>
                <h2>24 Juli 2022</h2>
              </Col>
              <Col lg={12} md={12} sm={24} xs={24} className="date">
                <br />
                <FieldTimeOutlined style={{ fontSize: 20 }} />
                <h2>8.30 WIB</h2>
                <h2>SELESAI</h2>
              </Col>
              <Col span={24} style={{ marginTop: 20 }}>
                <HeartOutlined
                  style={{
                    background: "#ff5f7b",
                    borderRadius: 20,
                    padding: 10,
                    fontSize: 20,
                  }}
                />
                <br />
                <br />
                <h2 className="address">
                  Kediaman Mempelai Wanita <br /> Jl. Rambutan RT. 01, RW. 02
                  Desa Pedasong, Adipala, Cilacap, Jawa Tengah
                </h2>
              </Col>
            </Row>
          </div>
        </div>
        <div className="custom-shape-divider-bottom-1614342402">
          <img
            src="https://datengdong.com/themes/winterblue/images/mask.png"
            alt="brush"
          />
        </div>
      </section>

      {/* couple section */}
      <div className="couple-section">
        <img
          src="/flower.png"
          alt="ss"
          className="flower-img"
          data-aos="zoom-in-up"
          style={{ width: 170 }}
        />
        <h2
          className="brides"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          Our Gallery
        </h2>

        <Image.PreviewGroup>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 4,
              xxl: 4,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                className="list-img"
                data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="300"
              >
                <Image src={item?.img} className="img" alt="" />
              </List.Item>
            )}
          />
        </Image.PreviewGroup>
      </div>

      <section
        className="parallax text-center mt-5"
        style={{
          background:
            "url('/gallery/photo_2022-05-17 10.49.19.jpeg') center no-repeat; background-size: cover",
          height: "45vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="custom-shape-divider-top-1610288850">
          <img
            src="https://datengdong.com/themes/winterblue/images/mask_bottom.png"
            alt="brush"
          />
        </div>
        <Row>
          <Col
            span={24}
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="300"
          >
            <blockquote style={{ padding: "0px 10px" }}>
              &quot;Tidak ada solusi yang lebih baik bagi dua insan yang saling
              mencintai di banding pernikahan&quot;
            </blockquote>
            <h3 className="mb-5">HR. Ibnu Majah</h3>
          </Col>
        </Row>
        <div className="custom-shape-divider-bottom-1614342402">
          <img
            src="https://datengdong.com/themes/winterblue/images/mask.png"
            alt="brush"
          />
        </div>
      </section>

      {/* couple section */}
      <div
        className="couple-section"
        data-aos="fade-zoom-in"
        data-aos-easing="ease-in-back"
        data-aos-delay="300"
      >
        <img
          src="/flower.png"
          alt="ss"
          className="flower-img"
          data-aos="zoom-in-up"
          style={{ width: 170 }}
        />
        <h2
          className="brides"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          Time To Happy Day
        </h2>
        {/* @ts-ignore */}
        <Countdown date={new Date("2022-07-24")} renderer={renderer} />
        <br />
        <Space>
          <a
            href="https://goo.gl/maps/djg8yQqGe2Fxkhke6"
            target="_blank"
            rel="noreferrer"
          >
            <Button icon={<EnvironmentFilled />}>Open Google Map</Button>
          </a>
          <a
            href="https://calendar.google.com/calendar/u/0/r/eventedit?dates=20220722T100000/20220722T200000&ctz=Asia/Jakarta&text=Yovie+%26+Brigita+Wedding&details=Yovie+%26+Brigita+Wedding+on+Sunday,+22+July+2022&location=Jl.+Rambutan+RT.001/RW.002+Desa+Pedasong,+Adipala,+Cilacap,+Jawa+Tengah&sprop&sprop=name:"
            target="_blank"
            rel="noreferrer"
          >
            <Button icon={<GoogleSquareFilled />}>Google Calendar</Button>
          </a>
        </Space>
      </div>

      {/* couple section */}
      <div className="couple-section">
        <img
          src="/flower.png"
          alt="ss"
          className="flower-img"
          data-aos="zoom-in-up"
          style={{ width: 170 }}
        />
        <br />
        <br />
        <GiftOutlined style={{ fontSize: 40 }} data-aos="zoom-in-up" />
        <h2
          className="brides"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          Give a Gift
        </h2>
        <br />
        <h3
          style={{ fontFamily: '"Lora", serif' }}
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="300"
        >
          Tanpa mengurangi rasa hormat, untuk melengkapi kebahagiaan pengantin,
          Anda dapat memberikan tanda kasih dengan transfer ke rekening atau
          mengirimkan kado ke alamat berikut : Jl. Rambutan RT. 01, RW. 02 Desa
          Pedasong, Adipala, Cilacap, Jawa Tengah
        </h3>
        <br />
        <Row
          gutter={[16, 16]}
          className="bank-container"
          justify="center"
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="300"
        >
          <Col lg={8} md={12} sm={24} xs={24}>
            <Card
              className="giftCard bca"
              bordered
              extra={
                <img src="https://menica.pro/img/logos/logo-bca.png" alt="" />
              }
            >
              <Paragraph copyable>0462485776</Paragraph>
              a/n Yovie Fesya Pratama
              <br />
              <br />
              <Button
                type="primary"
                icon={<QrcodeOutlined />}
                onClick={() => showModal("bca")}
                shape="round"
                style={{ width: "100%" }}
              >
                Buka QR Code
              </Button>
              <Modal
                title=""
                closable={false}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                centered
              >
                <Image src={displayModal} alt="brisya" preview={false} />
              </Modal>
            </Card>
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <Card
              className="giftCard bri"
              bordered
              extra={
                <img src="https://menica.pro/img/logos/logo-bri.png" alt="" />
              }
            >
              <Paragraph copyable>667201028363534</Paragraph>
              <br /> a/n Brigita Adha Safira
            </Card>
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <Card
              className="giftCard dana"
              bordered
              extra={<img src="/dana-color.png" width={50} alt="" />}
            >
              <Paragraph copyable>0895385026343</Paragraph>
              a/n Yovie Fesya Pratama
              <br />
              <br />
              <Button
                type="primary"
                icon={<QrcodeOutlined />}
                onClick={() => showModal("dana")}
                shape="round"
                style={{ width: "100%" }}
              >
                Buka QR Code
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
      <br />
      <br />
      <br />

      <section
        className="location guest-book"
        style={{
          background:
            "url('/bg3.png') center center no-repeat;background-size: cover",
        }}
      >
        <div className="custom-shape-divider-top-1610288850">
          <img
            src="https://datengdong.com/themes/winterblue/images/mask_bottom.png"
            alt="brush"
          />
        </div>
        <div className="container py-5">
          <img
            src="/flower.png"
            alt="list"
            style={{ maxHeight: 100 }}
            data-aos="fade-up"
            data-aos-easing="ease-in-back"
            data-aos-delay="300"
          />
          <div
            className="d-flex w-100 align-items-center justify-content-center mb-5 aos-init aos-animate"
            data-aos="fade-up"
            data-aos-easing="ease-in-back"
            data-aos-delay="300"
          >
            <h2
              className="caption"
              data-aos="fade-up"
              data-aos-easing="ease-in-back"
              data-aos-delay="300"
            >
              Guest Book
            </h2>
            <Row
              style={{
                border: "1px solid",
                margin: 30,
                borderRadius: 15,
                padding: 20,
              }}
              data-aos="fade-up"
              data-aos-easing="ease-in-back"
              data-aos-delay="300"
              gutter={[16, 16]}
            >
              <Col lg={12} md={12} sm={24} xs={24} className="guest-form">
                <Form
                  layout="vertical"
                  name="nest-messages"
                  onFinish={onFinish}
                  validateMessages={validateMessages}
                  form={form}
                >
                  <Form.Item
                    name="name"
                    label="Nama"
                    rules={[{ required: true }]}
                  >
                    <Input size="large" className="input-guest" />
                  </Form.Item>
                  <Form.Item
                    name="message"
                    label="Pesan"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea className="input-guest" rows={4} />
                  </Form.Item>
                  <Form.Item
                    name="join"
                    label="Apakah Anda berkenan hadir?"
                    rules={[{ required: true }]}
                  >
                    <Radio.Group>
                      <Radio value={true}>Hadir</Radio>
                      <Radio value={false}>Tidak Hadir</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name="countGuest" label="Jumlah Tamu">
                    <Radio.Group>
                      <Radio value="1">1</Radio>
                      <Radio value="2">2</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col
                lg={12}
                md={12}
                sm={24}
                xs={24}
                className="guest-container"
                style={{
                  overflowY: guest?.length < 6 ? "hidden" : "scroll",
                }}
              >
                <List
                  itemLayout="horizontal"
                  className="guest-list"
                  dataSource={guest}
                  renderItem={(item: any) => {
                    const { color, acronym } = getAcronym(
                      item?.name || "",
                      item?.id
                    );
                    return (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              style={{
                                backgroundImage: color,
                                display: "inline-flex",
                                alignItems: "center",
                              }}
                            >
                              <span className="avatar-name">{acronym}</span>
                            </Avatar>
                          }
                          title={<a href="https://ant.design">{item.name}</a>}
                          description={item?.message}
                        />
                      </List.Item>
                    );
                  }}
                />
              </Col>
            </Row>
          </div>
        </div>
        <div className="custom-shape-divider-bottom-1614342402">
          <img
            src="https://datengdong.com/themes/winterblue/images/mask.png"
            alt="brush"
          />
        </div>
      </section>

      <br />

      <section
        style={{ background: "url(/footerbg.png)" }}
        className="curved page-holder aos-init footer-bg aos-animate"
        id="particles-js"
        data-aos="fade-zoom-in"
        data-aos-easing="ease-in-back"
        data-aos-delay="300"
      >
        <div className="title-wrapper title-footer title-section text-center">
          <h2 className="greeting aos-init aos-animate" data-aos="fade-up">
            Best Regards,
          </h2>
          <h1 className="brides-name aos-init aos-animate" data-aos="fade-up">
            Yovie &amp; Brigita
          </h1>
        </div>
        <div className="custom-shape-divider-bottom-1610288749">
          <img
            src="https://datengdong.com/themes/winterblue/images/mask.png"
            alt=""
          />
        </div>
      </section>
      <footer style={{ marginTop: 20 }}>
        <h1 className="footer-end">Brisya&apos;s Wedding</h1>
      </footer>

      <button className="float" onClick={() => setPlayMusic(!playMusic)}>
        {/* <SoundOutlined style={{ fontSize: 20 }} /> */}
        <img
          src={playMusic ? "/audio-speaker.png" : "/mute.png"}
          className="invert"
          alt=""
          style={{ width: 20 }}
        />
      </button>
    </div>
  );
};

export default Home;
