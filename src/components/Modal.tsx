import React, { Component, Fragment } from "react";
import Button from "./Button";
import withWizard from "../core/form";
import styled from "@emotion/styled";
import TransparentButton from "./TransparentButton";

const Container = styled.div<{ isOpen: boolean }>`
  display: ${props => (props.isOpen ? "flex" : "none")};
  flex-flow: column;
  align-items: center;
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: auto;
  -webkit-animation: fadein 150ms;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Content = styled.div<Partial<ModalState>>`
	background-image: url('/images/${props => props.pictureColor}.png');
	background-position: center;
	background-repeat: no-repeat;
	padding: 15%;
	width: 100%;
	height: 100%;
	object-fit: contain;
	display: flex;
	justify-content: center;
	flex-flow: column;
	@media (max-width: 667px) {
		background-size: contain;
		font-size: 0.9em;
		padding: 0;
  }
`;

const Text = styled.div`
  color: white;
  font-size: 2em;
  text-align: center;
  line-height: normal;
  margin-bottom: 30px;
  padding-left: 24%;
  padding-right: 24%;
  @media (max-width: 600px) {
    font-size: 1.6em;
  }
  @media (max-width: 450px) {
    font-size: 1.2em;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 5em;
  padding-right: 5em;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 0.8em;
    padding: 0;
  }
  @media (max-width: 450px) {
    font-size: 0.6em;
    padding: 0;
  }
`;
// const CancelButton = styled.div`
//   display: flex;
//   justify-content: center;
//   background-color: transparent;
//   color: #e1a34e;
//   font-size: 1.8em;
//   border: 0;
//   cursor: pointer;
//   appearance: none;
//   align-self: center;
//   outline: none;
//   position: relative;
//   text-align: center;
//   text-decoration: none;
//   letter-spacing: 0.1em;
//   text-transform: capitalize;
//   padding: 0.5em 1.4em;

//   &:hover {
//     transform: translateY(-1px);
//   }
//   ::selection {
//     background-color: transparent;
//     color: #e1a34e;
//   }
// `;

const Backdrop = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
`;

interface ModalState {
  toggle: boolean;
  pictureColor: string;
}

interface ModalProps {
  setToggle: (prevState: boolean) => void;
  confirm: () => void;
  text: string[];
  confirmHref?: string;
}

class Modal extends Component<ModalProps, ModalState> {
  state = { pictureColor: "", toggle: false };
  toggleModal() {
    const { setToggle } = this.props;
    this.setState(prevState => {
      setToggle(!prevState.toggle);
      return { toggle: !prevState.toggle };
    });
  }

  handlerConfirm() {
    // do sth or redirect page
    const { confirm } = this.props;
    confirm();
    this.toggleModal();
  }
  componentWillReceiveProps(props) {
    // receive props from parent
    //set pictureColor
    const { field: major } = props;
    const field = major ? major.toLowerCase() : "content";
    let pictureColor = "";
    if (field === "content") pictureColor = "yellow";
    else if (field === "design") pictureColor = "pink";
    else if (field === "marketing") pictureColor = "green";
    else if (field === "programming") pictureColor = "blue";
    this.setState({ pictureColor });
    //set toggle
    const { toggle } = props;
    this.setState({ toggle });
  }
  render = () => {
    const { pictureColor, toggle } = this.state;
    const { text, confirmHref } = this.props;

    return (
      <Fragment>
        <Container id="modal" isOpen={toggle}>
          <Backdrop />
          <Content pictureColor={pictureColor} style={{ zIndex: 1 }}>
            <Text>
              {text instanceof Array
                ? text.map((t, i) => (
                    <span key={i}>
                      {t}
                      <br />
                    </span>
                  ))
                : text}
            </Text>
            <ButtonContainer>
              <TransparentButton
                onClick={() => this.toggleModal()}
                type="button"
              >
                ยกเลิก
              </TransparentButton>
              {confirmHref ? (
                <a href={confirmHref}>
                  <Button onClick={() => this.handlerConfirm()} type="button">
                    &nbsp;ยืนยัน&nbsp;
                  </Button>
                </a>
              ) : (
                <Button onClick={() => this.handlerConfirm()} type="button">
                  &nbsp;ยืนยัน&nbsp;
                </Button>
              )}
            </ButtonContainer>
          </Content>
        </Container>
        <div style={{ display: "none" }}>
          {/* Preload background image */}
          <img src="/images/yellow.png" />
          <img src="/images/pink.png" />
          <img src="/images/green.png" />
          <img src="/images/blue.png" />
        </div>
      </Fragment>
    );
  };
}

export default withWizard(Modal);


// earthea,m,dflgmdflmvfdlm

