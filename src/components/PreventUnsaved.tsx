import React from "react";
import { connect } from "react-redux";
import { isDirty } from "redux-form";

const warnAboutUnsavedChanges = formName => WrappedComponent => {
  class WarnAboutUnsavedChanges extends React.Component<{ isFormDirty: any }> {
    componentDidUpdate() {
      if (this.props.isFormDirty) {
        this.promptUnsaved();
      } else {
        this.clearPrompt();
      }
    }

    componentWillUnmount() {
      this.clearPrompt();
    }

    clearPrompt() {
      window.onbeforeunload = null;
    }

    promptUnsaved() {
      window.onbeforeunload = function(event) {
        const message = "กรุณาบันทึกข้อมูลก่อนออกจากหน้าปัจจุบัน";

        if (typeof event === "undefined" && window.event !== undefined) {
          event = window.event;
        }

        if (event) {
          event.returnValue = message;
        }

        return message;
      };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    isFormDirty: isDirty(formName)(state)
  });

  return connect(mapStateToProps)(WarnAboutUnsavedChanges);
};

export default warnAboutUnsavedChanges;
