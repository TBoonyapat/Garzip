import React, { useState, useCallback, useContext, useEffect } from 'react'
import {
  IonContent, IonHeader, IonPage, IonImg, IonToolbar, IonIcon, IonItem, IonLabel, IonButton,
  IonList, IonRouterLink, IonThumbnail, IonButtons, IonBackButton
} from '@ionic/react';
import './Booklist.css';
import Axios from "axios";

const Booklist = ({ ...props }) => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  async function getData() {
    await Axios.get("https://garzipback.herokuapp.com/book/app/" + props.match.params.name, {})
      .then((res) => {
        // console.log(res.data);
        setData(res.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  useEffect(async () => {
    await getData()
    await setLoading(false);
  }, [])

  function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

  const user_mode = localStorage.getItem('user_mode');
  if(user_mode === 'false'){
    return (

      <IonPage className="Booklist-Page">
  
  
        <IonContent fullscreen>
          <div className='Booklist'>
            <div className="bar">
              {/* <IonButtons slot="start">
                <IonBackButton icon="chevron-back-outline" text="" defaultHref="/HOME" />
              </IonButtons>
  
              <IonRouterLink href='/HOME' className="button-back">
                <IonIcon name="chevron-back-outline" ></IonIcon>
              </IonRouterLink> */}
  
  
              <IonButtons slot="start">
                <IonRouterLink onclick="history.back()" className="button-back">
                    <IonIcon name="chevron-back-outline" ></IonIcon>
                </IonRouterLink>
                {/* <IonBackButton  icon="chevron-back-outline" text="" defaultHref="/HOME" /> */}
                <IonLabel >GARZIP</IonLabel>
              </IonButtons>
  
            </div>
            <h1>{props.match.params.name}</h1>
  
            {/* <IonRouterLink href='/DetailBook/' className="button-back"> */}
            <IonList className='list-book'>
              {data.map((book, i) => {
                return (
                  <IonRouterLink href={`/DetailBook/${book._id}`} className="button-back">
  
                    <IonItem key={i} className="item-list" >
                      <IonThumbnail slot="start" className='image' >
                        <IonImg src={book.image} />
                      </IonThumbnail>
                      <span className="book">
                        <IonLabel className='title'>{book.name}</IonLabel>
                        <IonLabel className='detial'>???????????????????????? : {book.auther}</IonLabel>
                        <IonLabel className='detial'>?????????????????? : {kFormatter(book.view)} ???????????????</IonLabel>
                      </span>
                    </IonItem>
                  </IonRouterLink>
                )
              })}
            </IonList>
            {/* </IonRouterLink> */}
  
          </div>
  
        </IonContent>
      </IonPage>
  
    );
  }else{
    return (

      <IonPage className="Booklist-Page ">
  
  
        <IonContent fullscreen>
          <div className='Booklist Blind'>
            <div className="bar">
              <IonButtons slot="start">
                <IonRouterLink onclick="history.back()" className="button-back">????????????????????????</IonRouterLink>
              </IonButtons>
  
            </div>
            <h1>{props.match.params.name}</h1>
            {/* <IonRouterLink href='/DetailBook/' className="button-back"> */}
            <IonList className='list-book'>
              {data.map((book, i) => {
                return (
                  <IonRouterLink href={`/DetailBook/${book._id}`} className="button-back">
                    <IonItem key={i} className="item-list" >
                      <span className="book">
                        <IonLabel className='title'>{book.name}</IonLabel>
                        <IonLabel className='detial'>???????????????????????? : {book.auther}</IonLabel>
                        <IonLabel className='detial'>?????????????????? : {kFormatter(book.view)} ???????????????</IonLabel>
                      </span>
                    </IonItem>
                  </IonRouterLink>
                )
              })}
            </IonList>
            {/* </IonRouterLink> */}
  
          </div>
  
        </IonContent>
      </IonPage>
  
    );
  }
  
};

export default Booklist;
