import React from "react";
import styled from "styled-components";
import {
  SfprodisplayMediumWhite20px,
  ManropeBoldWhite40px,
  ManropeMediumWhite18px,
  PoppinsMediumMistGray20px,
  RobotoMediumBlack20px,
  ManropeMediumBlack16px,
  SifonnBoldWhite35px,
  ValignTextMiddle,
} from "../../styledMixins";
import "./LoginOptionsPage.css";

function LoginOptionsPage(props) {
  const {
    ovhLogoartboard12X1,
    spanText1,
    spanText2,
    spanText3,
    mail,
    spanText4,
    appleLogo,
    spanText5,
    googleLogo,
    spanText6,
    spanText7,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="login-options-page screen">
        <StatusBar></StatusBar>
        <Container>
          <OverlapGroup1>
            <LogoText>
              <OVHLOGOArtboard12x1 src={ovhLogoartboard12X1} alt="OVH LOGOArtboard 1@2x 1" />
              <OVERHEAR>
                <span className="sifonn-bold-white-35px">{spanText1}</span>
              </OVERHEAR>
            </LogoText>
            <Title>
              <span className="manrope-bold-white-40px">{spanText2}</span>
            </Title>
            <ChooseAnOptionBelow>
              <span className="manrope-medium-white-18px">{spanText3}</span>
            </ChooseAnOptionBelow>
          </OverlapGroup1>
          <OverlapGroup>
            <Logins>
              <SignInWithEmail>
                <IconMail src={mail} alt="icon-mail" />
                <SignInWithEmail1>
                  <span>
                    <span className="manrope-medium-black-16px">{spanText4}</span>
                  </span>
                </SignInWithEmail1>
              </SignInWithEmail>
              <AppleactionloginfirebaseAppleignore>
                <AppleLogo src={appleLogo} alt="Apple Logo" />
                <SignInWithApple>
                  <span className="sfprodisplay-medium-white-20px">{spanText5}</span>
                </SignInWithApple>
              </AppleactionloginfirebaseAppleignore>
              <GoogleactionloginfirebaseGooglecomp>
                <AppleLogo src={googleLogo} alt="Google Logo" />
                <SignInWithGoogle>
                  <span className="roboto-medium-black-20px">{spanText6}</span>
                </SignInWithGoogle>
              </GoogleactionloginfirebaseGooglecomp>
            </Logins>
            <Skip>
              <span>
                <span className="poppins-medium-mist-gray-20px">{spanText7}</span>
              </span>
            </Skip>
          </OverlapGroup>
        </Container>
      </div>
    </div>
  );
}

const StatusBar = styled.div`
  width: 388px;
  height: 51px;
  background-color: var(--midnight-blue);
`;

const Container = styled.div`
  width: 388px;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  align-items: flex-start;
  min-height: 664px;
`;

const OverlapGroup1 = styled.div`
  width: 388px;
  height: 401px;
  position: relative;
`;

const LogoText = styled.div`
  position: absolute;
  width: 388px;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 1px 0;
  align-items: center;
  min-height: 323px;
  gap: 33px;
`;

const OVHLOGOArtboard12x1 = styled.img`
  width: 388px;
  height: 243px;
  margin-top: 10px;
`;

const OVERHEAR = styled.div`
  ${SifonnBoldWhite35px}
  min-height: 35px;
  min-width: 199px;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
`;

const Title = styled.h1`
  ${ManropeBoldWhite40px}
  position: absolute;
  width: 388px;
  top: 322px;
  left: 0;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
`;

const ChooseAnOptionBelow = styled.div`
  ${ManropeMediumWhite18px}
  position: absolute;
  width: 388px;
  top: 376px;
  left: 0;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
`;

const OverlapGroup = styled.div`
  width: 388px;
  height: 216px;
  position: relative;
`;

const Logins = styled.div`
  position: absolute;
  width: 364px;
  top: 0;
  left: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 186px;
  gap: 18px;
`;

const SignInWithEmail = styled.div`
  height: 50px;
  display: flex;
  padding: 13px 89px;
  align-items: flex-start;
  min-width: 338px;
  gap: 10px;
  background-color: var(--white);
  border-radius: 7px;
`;

const IconMail = styled.img`
  width: 20px;
  height: 20px;
  margin-top: 1px;
`;

const SignInWithEmail1 = styled.div`
  ${ValignTextMiddle}
  ${ManropeMediumBlack16px}
            height: 22px;
  letter-spacing: 0;
  line-height: normal;
`;

const AppleactionloginfirebaseAppleignore = styled.div`
  height: 50px;
  display: flex;
  padding: 12px 57px;
  align-items: flex-start;
  min-width: 343px;
  gap: 15px;
  background-color: var(--black);
  border-radius: 10px;
  box-shadow: 0px 2px 3px #0000002b, 0px 0px 3px #00000015;
`;

const AppleLogo = styled.img`
  width: 24px;
  height: 24px;
  align-self: center;
`;

const SignInWithApple = styled.div`
  ${SfprodisplayMediumWhite20px}
  width: 175px;
  letter-spacing: 0;
  line-height: normal;
`;

const GoogleactionloginfirebaseGooglecomp = styled.div`
  height: 50px;
  display: flex;
  padding: 12px 49px;
  align-items: flex-start;
  min-width: 343px;
  gap: 15px;
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0px 2px 3px #0000002b, 0px 0px 3px #00000015;
`;

const SignInWithGoogle = styled.div`
  ${RobotoMediumBlack20px}
  width: 190px;
  letter-spacing: 0;
  line-height: normal;
`;

const Skip = styled.div`
  ${ValignTextMiddle}
  ${PoppinsMediumMistGray20px}
            position: absolute;
  width: 388px;
  height: 30px;
  top: 186px;
  left: 0;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
`;

export default LoginOptionsPage;
