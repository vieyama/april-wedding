/* eslint-disable @next/next/no-img-element */
import {
  CalendarOutlined,
  EnvironmentFilled,
  FieldTimeOutlined,
  GiftOutlined,
  GoogleSquareFilled,
  HeartOutlined,
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
import Countdown from "react-countdown";
import { useEffect, useState } from "react";
import useSound from "use-sound";

import getAcronym from "utils/acronym";
import { filter, isEmpty, toNumber } from "lodash";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { wording } from "constants/wording";

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
      img: "/gallery/IMG_8557.JPG",
    },
    {
      img: "/gallery/IMG_8558.JPG",
    },
    {
      img: "/gallery/IMG_8559.JPG",
    },
    {
      img: "/gallery/IMG_8560.JPG",
    },
    {
      img: "/gallery/IMG_8566.JPG",
    },
    {
      img: "/gallery/IMG_8578.JPG",
    },
    {
      img: "/gallery/IMG_8611.JPG",
    },
    {
      img: "/gallery/IMG_8662.JPG",
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
        <meta name="description" content={wording.desc} />
        <meta
          property="og:image"
          itemProp="image"
          content="/photo_bg.jpeg"
          key="ogimage"
        />
        <meta property="image" itemProp="image" content="/photo_bg.jpeg" />

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
            src="/flower.svg"
            alt="ss"
            className="flower-img"
            data-aos="zoom-in-up"
          />
          <h2 className="greeting" data-aos="fade-up">
            The Wedding Of
          </h2>
          <h1 className="brides-name" data-aos="fade-up">
            {wording.brideName}
          </h1>

          <h4 className="date" data-aos="fade-up">
            {wording.marriedDate}
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
          src="/flower.svg"
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
          {wording.brideName}
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
            <img src="/man.jpg" alt="" className="bride-img" />
            <h2 className="name">{wording.groom.nickname}</h2>
            <h2 className="fullname">{wording.groom.fullName}</h2>
            <p>Putra dari Pasangan</p>
            <b>
              Bpk. {wording.groom.parent.father} & <br /> Ibu.{" "}
              {wording.groom.parent.mother}
            </b>
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
            <img src="/woman.jpg" alt="" className="bride-img" />
            <h2 className="name">{wording.bride.nickname}</h2>
            <h2 className="fullname">{wording.bride.fullName}</h2>
            <p>Putri dari Pasangan</p>
            <b>
              Bpk. {wording.bride.parent.father} & <br /> Ibu.{" "}
              {wording.bride.parent.mother}
            </b>
          </Col>
        </Row>
      </div>

      <section
        className="location"
        style={{
          background:
            "url('/gallery/IMG_8560.JPG') center center no-repeat;background-size: cover",
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
            src="/flower.svg"
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
                <h2>Akad</h2>
                <br />
                <CalendarOutlined style={{ fontSize: 20 }} />
                <h2>Rabu</h2>
                <h2>14 september 2022</h2>
              </Col>
              <Col lg={12} md={12} sm={24} xs={24} className="date">
                <br />
                <FieldTimeOutlined style={{ fontSize: 20 }} />
                <h2>9.00 WIB</h2>
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
                <h2 className="address">Kediaman Mempelai Wanita</h2>
              </Col>
            </Row>
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
                <h2>Resepsi</h2>
                <br />
                <CalendarOutlined style={{ fontSize: 20 }} />
                <h2>Sabtu</h2>
                <h2>26 November 2022</h2>
              </Col>
              <Col lg={12} md={12} sm={24} xs={24} className="date">
                <br />
                <FieldTimeOutlined style={{ fontSize: 20 }} />
                <h2>12.00 WIB - 14.00 WIB</h2>
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
                <h2 className="address">Hotel Wisata Niaga Purwokerto</h2>
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
          src="/flower.svg"
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
            "url('/gallery/IMG_8560.JPG') center no-repeat; background-size: cover",
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
          src="/flower.svg"
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
            href="https://www.google.com/maps/place/Hotel+Wisata+Niaga+Purwokerto,+Jl.+Merdeka+No.5,+Brubahan,+Purwanegara,+Kec.+Purwokerto+Tim.,+Kabupaten+Banyumas,+Jawa+Tengah+53116/@-7.4253125,109.2367758,17z/data=!4m12!1m6!3m5!1s0x2e655f8067c215d1:0xd03268861d153ea7!2sLINK+COFFEE,+Jl.+Merdeka+No.9,+Brubahan,+Purwanegara,+Kec.+Purwokerto+Tim.,+Kabupaten+Banyumas,+Jawa+Tengah+53116!8m2!3d-7.4250037!4d109.2370906!3m4!1s0x2e655e8838fc674f:0xc37196ebd9e1387b!8m2!3d-7.4253125!4d109.2367758?hl=id-vn"
            target="_blank"
            rel="noreferrer"
          >
            <Button icon={<EnvironmentFilled />}>Open Google Map</Button>
          </a>
          <a
            href="https://calendar.google.com/calendar/u/0/r/eventedit?dates=20220722T100000/20220722T200000&ctz=Asia/Jakarta&text=Andhika+%26+Aprilia+Wedding&details=Andhika+%26+Aprilia+Wedding+on+Saturday,+26+November+2022&location=Wisata%20Niaga%20Hotel,%20Jl.%20Merdeka%20No.5,%20Brubahan,%20Purwanegara,%20Kec.%20Purwokerto%20Tim.,%20Kabupaten%20Banyumas,%20Jawa%20Tengah%2053116,%20Indonesia&sprop&sprop=name:"
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
          src="/flower.svg"
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
          mengirimkan kado ke alamat berikut : Perumahan bukit sidabowa Asri J12
          kel.sidabowa Kec. Patikaraja Kab. Banyumas
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
                <img
                  src="https://yt3.ggpht.com/wPRw-wSXd4ZT0BmP7tME32UydRbkA2bjQQdwvF-fmBvDDc9GU9vnUnqHX_zdSlv34f5JF9HuZw=s900-c-k-c0x00ffffff-no-rj"
                  alt=""
                  width={50}
                />
              }
            >
              <Paragraph copyable>1800002911057</Paragraph>
              a/n Aprilia dwi jayanti
            </Card>
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <Card
              className="giftCard dana"
              bordered
              extra={<img src="/dana-color.png" width={50} alt="" />}
            >
              <Paragraph copyable>081575087606</Paragraph>
              a/n Aprilia dwi jayanti
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
            src="/flower.svg"
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
        style={{ background: "url(/gallery/IMG_8578.JPG)" }}
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
            {wording.brideName}
          </h1>
        </div>
        <div className="custom-shape-divider-bottom-1610288749">
          <img
            src="https://datengdong.com/themes/winterblue/images/mask.png"
            alt=""
          />
        </div>
      </section>
      <footer style={{ marginTop: 50 }}>
        <h4 className="footer-end">Made with love by Brisya Dev</h4>
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
