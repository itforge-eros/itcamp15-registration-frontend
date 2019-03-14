import { connect } from "react-redux";
import { clearMajor } from "../ducks/submission";
import TransparentButton from "./TransparentButton";
import { Fragment, useState } from "react";
import Modal from "./Modal";
import { getMajorFromPath } from "../core/util";

interface ChangeMajorButtonProps {
  field?: string;
  clearMajor?: () => void;
}

export default connect(
  null,
  { clearMajor }
)((props: ChangeMajorButtonProps) => {
  if (typeof window !== "undefined") {
    const { clearMajor, field } = props;
    const [toggle, setIsToggle] = useState<boolean>(false);
    const confirm = () => {
      setIsToggle(!toggle);
    };
    return (
      <Fragment>
        <Modal
          text={[
            "คำตอบทั้งหมดที่น้องกรอกในหน้า",
            `"ยืนยันสาขา"`,
            "จะถูกลบทั้งหมด น้องยืนยันจะเปลี่ยนสาขาไหม?"
          ]}
          field={field || getMajorFromPath()}
          toggle={toggle}
          setToggle={setIsToggle}
          confirm={clearMajor}
        />
        <TransparentButton color="white" onClick={confirm} type="button">
          เปลี่ยนสาขา
        </TransparentButton>
      </Fragment>
    );
  } else {
    return null;
  }
});
