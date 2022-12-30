import { IonButtons, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRouterOutlet, IonRow, IonTabButton, IonTitle, IonToolbar, IonRouterLink, IonLabel, IonItem } from '@ionic/react';
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { Route } from 'react-router';
import { client, challenge, authenticate } from '../../api/api'
import App from '../../App';
import './Login.css';


const Login: React.FC = () => {
  const [address, setAddress] = useState('')
  const [token, setToken] = useState()
  useEffect(() => {
    /* when the app loads, check to see if the user has already connected their wallet */
    checkConnection()
  }, [])
  async function checkConnection() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.listAccounts()
    if (accounts.length) {
      setAddress(accounts[0])
    }
  }
  async function connect() {
    /* this allows the user to connect their wallet */
    const account = await window.ethereum.send('eth_requestAccounts')
    if (account.result.length) {
      setAddress(account.result[0])
    }
  }
  async function login() {
    try {
      /* first request the challenge from the API server */
      const challengeInfo = await client.query({
        query: challenge,
        variables: { address }
      })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      /* ask the user to sign a message with the challenge info returned from the server */
      const signature = await signer.signMessage(challengeInfo.data.challenge.text)
      /* authenticate the user */
      const authData = await client.mutate({
        mutation: authenticate,
        variables: {
          address, signature
        }
      })
      /* if user authentication is successful, you will receive an accessToken and refreshToken */
      const { data: { authenticate: { accessToken }}} = authData
      console.log({ accessToken })
      setToken(accessToken)
    } catch (err) {
      console.log('Error signing in: ', err)
    }
  }
  
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Se connecter</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="center">
          <IonRouterOutlet>
            <Route path="/app" component={App} exact={true} />
          </IonRouterOutlet>
          <IonGrid fixed={true}>
            <IonRow>
              {! address && <IonTabButton onClick={connect}>Se connecter au Wallet</IonTabButton> }
              { address && !token && <IonTabButton onClick={login}>Se connecter</IonTabButton> }
              { address && token && <IonRouterLink routerLink="/app">Accéder à l'application</IonRouterLink> }
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Login;
