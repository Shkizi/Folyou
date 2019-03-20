import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
// reactstrap components


class Notifications extends React.Component {
  notify = (sentence,place,color,duration,icony) => {
     var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
      type = "info";
        break;
    }
    var options = {};
    options = {
      place: place||"bl",
      message: (
        <div>
          <div>
           <Translate id={sentence||"error.unspecific"}/> 
          </div>
        </div>
      ),
      type: type,
      icon: icony||"tim-icons icon-bell-55",
      autoDismiss: duration||5
    };
    this.refs.notificationAlert.notificationAlert(options);
  };
  componentDidMount(){
    this.props.notifParent.setState({notificationModule:this});
  }
  render() {
     
    return (
      <>
        <div className="content">
          <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
        </div>
      </>
    );
  }
}
export default withLocalize(Notifications);