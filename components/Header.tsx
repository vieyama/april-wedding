/* eslint-disable @next/next/no-img-element */
import { MailOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { wording } from "constants/wording";

const HeaderComponent = ({ setPlayMusic, playMusic = false }: any) => {
  const headerRef: any = useRef();
  const router = useRouter();

  const handleClick = () => {
    headerRef.current.style.height = "0";
    window.scrollTo(0, 0);
    setPlayMusic(!playMusic);
  };
  return (
    <div className="header-section" ref={headerRef}>
      <div className="title-wrapper text-center" data-aos="fade-up">
        <div>
          <img src="/flower.png" alt="ss" className="flower-img" />
          <h2 className="greeting">
            Hello, You&apos;re Invited <br />
            The Wedding Of
          </h2>
        </div>
        <div>
          <h1 className="brides-name">{wording.brideName}</h1>

          <h4 className="date">{wording.marriedDate}</h4>
        </div>
        <div>
          <h4 className="to">
            KEPADA YTH <br /> BAPAK/IBU/SAUDARA/I <br />
          </h4>

          <h4 className="person">{router?.query?.to || ""}</h4>

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
    </div>
  );
};

export default HeaderComponent;
