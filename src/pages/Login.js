import React from 'react';
import {
IonPage,
IonContent,
IonHeader,
IonToolbar,
IonList,
IonItem,
IonLabel,
IonInput, 
IonTitle,
IonButton,
IonButtons,
IonIcon,
} from '@ionic/react';
//import { Mutation } from 'react-apollo'
//import { gql } from 'apollo-boost';
//import Cookies from 'js-cookie'
import { AUTH_TOKEN } from '../constants'
import { exitOutline} from 'ionicons/icons';   
import {
 Link
} from "react-router-dom";
//const LOGIN_MUTATION = gql`
//  mutation LoginMutation($email: String!, $password: String!) {
//          login(email: $email, password: $password) {
//                    token
//                  }
//        }
//`



class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }

  _saveUserData = token => {
          localStorage.setItem(AUTH_TOKEN, token)
        }

_confirm = async data => {
const { token } =  data.login 
      this._saveUserData(token)
}

componentDidMount(){
if (localStorage.getItem('token')) {
    localStorage.removeItem('token')
    }
}

// this.props.history.push(`/`)

    handleSubmit = e => {
		e.preventDefault()
		console.log("Im submitting JWT: ",this.state)

		const options = {
			method: 'post',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: `email=${this.state.email.toLowerCase()}&password=${this.state.password}`
		}

const url = "https://apollo.simulacron-3.com/login"

		fetch(url,options)
			.then(response => {
				if (!response.ok) {
					if (response.status === 404) {
						alert('Email not found, please retry')
					}
					if (response.status === 401) {
						alert('Email and password do not match, please retry')
					}
				}
				return response
			})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
                    console.log("jwt data: ",data)
					//document.cookie = 'token=' + data.token
                    localStorage.setItem('token', data.token)
					this.props.history.push(`/${data.clientId}/dashboard`)
				}
			})

        }

    render(){
		const { email, password } = this.state
		return(
			<IonPage>
			<IonContent fullscreen={true}>

			<IonHeader collapse="condense" mode="ios">
			<IonToolbar>
			<IonTitle size="large">
			Login			
			</IonTitle>
<IonButtons slot="end">
<Link to="/">
<IonButton>
			<IonIcon slot="end" icon={exitOutline}/>
</IonButton>
</Link>
</IonButtons>

			</IonToolbar>
			</IonHeader>

			<IonList>
            <form onSubmit={(e) =>{
					this.handleSubmit(e)
            }} >
			<IonItem>
			<IonLabel position="floating">
			Email:
			</IonLabel>
			<IonInput 
			name="email"
			type="email"
			inputmode="email"
			autocomplete="email"
            autofocus={true}
			required={true}
			clearInput={true}
			value={email} 
			onIonChange={e => this.setState({email: e.target.value})} />
			</IonItem>


			<IonItem>
			<IonLabel position="floating">
			Password:
			</IonLabel>
			<IonInput 
			name="password"
			type="password"
			clearInput={true}
			clearOnEdit={true}
			required={true}
			value={password} 
			onIonChange={e => this.setState({password: e.target.value})} 
            onKeyPress={((e) =>{
                if (e.key === 'Enter'){
                    this.handleSubmit(e)
                }
            })}
            />
			</IonItem>

			<IonItem lines="none">
			</IonItem>

			<IonItem lines="none">
{/*
			<Mutation 
			mutation={LOGIN_MUTATION}
			variables={{email, password}}
			onCompleted={data => this._confirm(data)} >
			{mutation => (
*/}
				<IonButton
				slot="end"
				size="medium"
				type="submit"

				>
				Submit
				</IonButton>
{/*
			)}
			</Mutation>
*/}
			</IonItem>

    </form>
			</IonList>


			</IonContent>
			</IonPage>
		)
    }

}
export default Login;
