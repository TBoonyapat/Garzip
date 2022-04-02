import React, { useState, useEffect } from 'react'
import {
  IonContent, IonPage, IonImg, IonText, IonIcon, IonLabel, IonButton,
  IonItem, IonRouterLink, IonRange, IonList, IonBackButton, IonThumbnail
} from '@ionic/react';
import './DetailBook.css';
import Axios from "axios";
import Speech from 'speak-tts'
import { wait } from '@testing-library/react';


const DetailBook = ({ ...props }) => {

  // const [name, setName] = useState(props.match.params.id)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState('')

  const speech = new Speech()
  async function getData() {
    await Axios.get("http://localhost:3000/book/app/detail/" + props.match.params.id, {})
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

  speech.init({
    'volume': 1,
    'lang': 'en-GB',
    'rate': 0.8,
    'pitch': 1,
    'splitSentences': true,
    // 'listeners': {
    //   'onvoiceschanged': (voices) => {
    //     console.log("Event voiceschanged", voices)
    //   }
    // }
  })

  async function playsound() {
    setStory("I am running you idiot.")
    speech.speak({
      text: story,
    }).then(() => {
      console.log("Success !")
    }).catch(e => {
      console.error("An error occurred :", e)
    })
  }


  return (
    <>
      {
        loading ?
          <div></div>
          :
          <>
            <IonPage className="DetailPage">
              {/* <IonHeader className="test1">
                <IonToolbar className="toolbar-container">
                  <IonRouterLink href='/' className="button-back" >
                    <IonIcon name="chevron-back-outline" ></IonIcon>
                  </IonRouterLink>
                </IonToolbar>
              </IonHeader> */}
              <IonContent  >
                <div className='DetailBook' >
                  <div className="bar">
                    {/* <IonButtons slot="start">
                      <IonBackButton icon="chevron-back-outline" text="" defaultHref="/HOME" />
                    </IonButtons> */}
                    <IonRouterLink href='/HOME' className="button-back">
                      <IonIcon name="chevron-back-outline" ></IonIcon>
                    </IonRouterLink>
                    <IonRouterLink href='/HOME' className="button-save">
                      <IonIcon name="heart-circle-outline"></IonIcon>
                      <div className="save"></div>
                    </IonRouterLink>
                    {/* <IonRouterLink href='/HOME' className="button-back">
                      <IonIcon name="chevron-back-outline" ></IonIcon>
                    </IonRouterLink> */}
                  </div>
                  <div className="data-book">
                    <IonImg className="image-book" src={data[0].image} />
                    <h3 >{data[0].name}</h3>
                    <p>เขียนโดย : {data[0].auther}</p>
                    <p>ระยะเวลา : X.XX  น.</p>
                  </div>
                  <div className='players'>

                    <IonRange className='range-time'>
                      <IonLabel slot="start" className='start-time'>
                        <IonText>
                          <b>
                            00.00
                          </b>
                        </IonText>
                      </IonLabel>

                      <IonLabel slot="end">
                        <IonText>
                          <b>
                            11.11
                          </b>
                        </IonText>
                      </IonLabel>
                    </IonRange>

                  </div>
                  <div className='mix-button'>
                    <IonButton fill="clear" mode="ios" className='button-play-back'>
                      <IonIcon name="play-back-outline"></IonIcon>
                    </IonButton >

                    <IonButton fill="clear" mode="ios" className='button-play' onClick={playsound}>
                      <IonIcon name="play-circle-outline" ></IonIcon>
                    </IonButton >

                    {/* <IonButton fill="clear" mode="ios">
                      <IonIcon name="pause-circle-outline"></IonIcon>
                    </IonButton> */}

                    <IonButton fill="clear" mode="ios" className='button-play-forward'>
                      <IonIcon name="play-forward-outline"></IonIcon >
                    </IonButton>
                    {/* <IonButton fill="clear" mode="ios" className='button-like'>
                      <IonIcon className='like-book' name="heart-outline"></IonIcon>
                    </IonButton> */}
                    {/* <IonButton fill="clear" mode="ios" className='button-play-auto'>
                      <IonIcon name="shuffle-outline"></IonIcon>
                    </IonButton> */}
                    {/* <div className='button-name'>
                      <span className="save">บันทึก</span>
                      <span className="auto">เล่นอัตโนมัติ</span>
                    </div> */}
                  </div>

                  <div className='story-book'>
                    <h4 className='title-story'>เนื้อเรื่องย่อ</h4>
                    <div className='story'>{data[0].trailer}</div>
                  </div>

                  <div className='episode-Booklist'>
                    <h1>ตอน</h1>
                    <IonList className='list-book'>
                      {data.map((image, i) => (
                        <IonItem key={i} className="item-list" href='/DetailBook'>
                          <IonThumbnail slot="start" className='image' >
                            <IonImg src={image.src} />
                          </IonThumbnail>
                          <span className="book">
                            <IonLabel className='title'>{image.text}</IonLabel>
                            <IonLabel className='detial'>เขียนโดย : {image.who}</IonLabel>
                            <IonLabel className='detial'>ระยะเวลา : {image.time} น.</IonLabel>
                          </span>

                        </IonItem>
                      ))}
                    </IonList>
                  </div>
                </div>

              </IonContent>
            </IonPage >
          </>
      }
    </>
  );
};

export default DetailBook;