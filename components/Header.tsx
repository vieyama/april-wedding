/* eslint-disable @next/next/no-img-element */
import { MailOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useRef } from "react";

const HeaderComponent = ({ setPlayMusic }: any) => {
  const headerRef: any = useRef();

  const handleClick = () => {
    headerRef.current.style.height = "0";
    window.scrollTo(0, 0);
    setPlayMusic(true);
  };
  return (
    <div className="header-section" ref={headerRef}>
      <div className="title-wrapper text-center" data-aos="fade-up">
        <img src="/flower.png" alt="ss" className="flower-img" />
        <h2 className="greeting">
          Hello, You&apos;re Invited <br />
          The Wedding Of
        </h2>
        <h1 className="brides-name">Yovie & Brigita</h1>

        <h4 className="date">24 Juli 2022</h4>

        <h4 className="to">
          KEPADA YTH <br /> BAPAK/IBU/SAUDARA/I <br />
        </h4>

        <h4 className="person">Yovie Fesya Pratama</h4>

        <Button
          type="primary"
          icon={<MailOutlined />}
          size="large"
          shape="round"
          onClick={handleClick}
        >
          Buka Undangan
        </Button>
      </div>
    </div>
  );
};

export default HeaderComponent;
