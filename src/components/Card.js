import React from 'react';
import {
IonText,
IonCard,
IonCardHeader,
IonCardTitle,
IonCardSubtitle,
IonCardContent,
IonIcon,
} from '@ionic/react';
  
class Card extends React.Component {
	constructor(props){
		super(props);
        this.state = {
        }
	}


    componentDidMount(){
    }

	render(){
  return (
      <div>
                <IonCard style={{ "--background": this.props.background}}  mode="ios" className="fitContentCard blobCard">
                <IonCardHeader>
      { this.props.title &&
          <IonText color={this.props.color}>
                <IonCardTitle >
          
      {this.props.title}
                </IonCardTitle>
          </IonText>
      }
      { this.props.subtitle &&
                <IonCardSubtitle style={{"color":"rgb(102, 102, 102)"}}>
              {this.props.subtitle} 
      { this.props.icon &&
                <IonIcon icon={this.props.icon} color="primary" style={{marginBottom: "-2px"}}/>
      }
                </IonCardSubtitle>
      }
                </IonCardHeader>
      { this.props.content &&
          <IonCardContent>
          {this.props.content}
          </IonCardContent>
      }

                </IonCard>
      </div>
  );
}
}

export default Card;
