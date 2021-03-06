import './Home.css';
import React, { useState, useCallback, useContext, useEffect } from 'react'
import {
    IonContent, IonList, IonLabel, IonThumbnail,
    IonItem, IonPage, IonHeader, IonIcon, IonSlides,
    IonSlide, IonCard, IonCardContent, IonCardTitle,
    IonRouterLink
} from '@ionic/react';
import Axios from "axios";
import moment from "moment";
import { Swiper, SwiperSlide } from 'swiper/react';
const user_id = localStorage.getItem("user_id");

const slideOpts = {
    initialSlide: 1,
    speed: 400
};
const initialState = {
    name: ''
}
const Home = () => {
    // const { state, dispatch } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [user, setUser] = useState([])

    const doPlay = {

    };

    async function getData() {
        await Axios.get("https://garzipback.herokuapp.com/book/app", {})
            .then((res) => {
                // console.log(res.data[0]);
                setData(res.data)
                setLoading(false);
            })
            .catch((error) => {
                console.log('#1')
                console.log(error)
            });
    }
    async function getUser() {
        await Axios.get("http://localhost:3000/book/continue/"+ user_id, {})
            .then((res) => {
                // console.log(res.data);
                setUser(res.data)
            })
            .catch((error) => {
                console.log('#2')
                console.log(error)
            });
    }
    useEffect(async () => {
        await getData()
        await getUser()
        // await setLoading(false);
    }, [])

    function kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    }

    const user_mode = localStorage.getItem('user_mode');
    if (user_mode === 'false') {
        return (
            <>
                {
                    loading ?
                        // <div>loading...</div>
                        <></>
                        :
                        <>
                            <IonPage className="HomePage">
                                <IonContent fullscreen >
                                    <div className="bar">
                                        <IonLabel >GARZIP</IonLabel>
                                    </div>
                                    {/* <a href="/login">login</a> */}

                                    <div className='Catagory'>
                                        <IonLabel className='name_catagory'>??????????????????</IonLabel>
                                        <IonLabel className='viewall' href="/booklist">???????????????????????????</IonLabel>
                                        <Swiper
                                            sspaceBetween={0}
                                            slidesPerView={3.5} >
                                            {user.sort((a, b) => (a._id > b._id ? -1 : 1)).map((book, index) => {
                                            // {user.map((book, index) => {
                                                console.log(book.continue_book[0])
                                                return (
                                                    <>
                                                        <SwiperSlide className='Slide-book' >
                                                            <IonRouterLink href={"/DetailBook/" + book.continue_book[0]._id} >
                                                            <IonCard
                                                                    className='Card-book'
                                                                    onClick={() => doPlay}>
                                                                    <span className='image-b'>
                                                                        <img src={book.continue_book[0].image} className='img-book' />
                                                                    </span>
                                                                    <IonCardContent className='CardContent'>
                                                                        <IonCardTitle className='title'>{book.continue_book[0].name}</IonCardTitle>
                                                                    </IonCardContent>
                                                                </IonCard>
                                                           </IonRouterLink>
                                                        </SwiperSlide>

                                                    </>
                                                )
                                            })}

                                        </Swiper>
                                    </div>

                                    <IonList className='hot-book'>
                                        <IonHeader className='Header'>
                                            <IonIcon name="trophy-outline"></IonIcon>
                                            <IonLabel className='title-category'> ????????????????????? </IonLabel>
                                            <IonIcon name="trophy-outline"></IonIcon>
                                            <p >??????????????????????????????????????????????????????????????????????????????????????????</p>
                                        </IonHeader>

                                        {data.sort((a, b) => (a.view > b.view ? -1 : 1)).filter((_, idx) => (idx < 3)).map((book, index) => {
                                            return (
                                                <>
                                                    <IonRouterLink href={"/DetailBook/" + book._id} >
                                                        <IonItem key={index} onClick={() => doPlay} button className="item-list">
                                                            <IonThumbnail slot="start" className='imge'>
                                                                <img src={book.image} />
                                                            </IonThumbnail>
                                                            <IonLabel className="book">
                                                                <IonLabel className='title'>{book.name}</IonLabel>
                                                                <IonLabel className='detial'>???????????????????????? : {book.auther}</IonLabel>
                                                                <IonLabel className='detial'>???????????????????????? : {book.trailer} ???.</IonLabel>
                                                                <IonLabel className='detial'>?????????????????? : {kFormatter(book.view)} ???????????????</IonLabel>
                                                            </IonLabel>
                                                        </IonItem>
                                                    </IonRouterLink>
                                                    {/* {moment(book.create_date).format("MMM DD YYYY hh:mm:ss")} */}
                                                </>

                                            )
                                        })}
                                    </IonList>

                                    <div className='Catagory-even'>
                                        <IonLabel className='name_catagory'>????????????????????????????????????????????????</IonLabel>
                                        <IonRouterLink href="/Booklist/??????????????????????????????" >
                                            <IonLabel className='viewall' href="/booklist">???????????????????????????</IonLabel>
                                        </IonRouterLink>
                                        <Swiper
                                            sspaceBetween={0}
                                            slidesPerView={3.5} >
                                            {data.filter(data => data.status == false).sort((a, b) => (a._id > b._id ? -1 : 1)).map((book, index) => {
                                                return (
                                                    <>
                                                        <SwiperSlide className='Slide-book' >
                                                            <IonRouterLink href={"/DetailBook/" + book._id} >
                                                                <IonCard
                                                                    className='Card-book'
                                                                    onClick={() => doPlay}>
                                                                    <span className='image-b'>
                                                                        <img src={book.image} className='img-book' />
                                                                    </span>
                                                                    <IonCardContent className='CardContent'>
                                                                        <IonCardTitle className='title'>{book.name}</IonCardTitle>
                                                                    </IonCardContent>
                                                                </IonCard>
                                                            </IonRouterLink>
                                                        </SwiperSlide>
                                                    </>
                                                )
                                            })}
                                        </Swiper>
                                    </div>

                                    <div className='Catagory'>
                                        <IonLabel className='name_catagory'>???????????????</IonLabel>
                                        <IonRouterLink href="/Booklist/???????????????" >
                                            <IonLabel className='viewall' href="/booklist">???????????????????????????</IonLabel>
                                        </IonRouterLink>
                                        <Swiper
                                            sspaceBetween={0}
                                            slidesPerView={3.5} >
                                            {data.filter(cate => cate.category == '???????????????').filter((_, idx) => (idx < 4)).map((book, index) => {
                                                return (
                                                    <>
                                                        <SwiperSlide className='Slide-book' >
                                                            <IonRouterLink href={"/DetailBook/" + book._id} >
                                                                <IonCard
                                                                    className='Card-book'
                                                                    onClick={() => doPlay}>
                                                                    <span className='image-b'>
                                                                        <img src={book.image} className='img-book' />
                                                                    </span>
                                                                    <IonCardContent className='CardContent'>
                                                                        <IonCardTitle className='title'>{book.name}</IonCardTitle>
                                                                    </IonCardContent>
                                                                </IonCard>
                                                            </IonRouterLink>
                                                        </SwiperSlide>

                                                    </>
                                                )
                                            })}

                                        </Swiper>
                                    </div>

                                    <div className='Catagory-even'>
                                        <IonLabel className='name_catagory'>??????????????????</IonLabel>
                                        <IonRouterLink href="/Booklist/??????????????????" >
                                            <IonLabel className='viewall' href="/booklist">???????????????????????????</IonLabel>
                                        </IonRouterLink>
                                        <Swiper
                                            sspaceBetween={0}
                                            slidesPerView={3.5} >
                                            {data.filter(cate => cate.category == '??????????????????').filter((_, idx) => (idx < 4)).map((book, index) => {

                                                return (
                                                    <>
                                                        <SwiperSlide className='Slide-book' >
                                                            <IonRouterLink href={"/DetailBook/" + book._id} >
                                                                <IonCard
                                                                    className='Card-book'
                                                                    onClick={() => doPlay}>
                                                                    <span className='image-b'>
                                                                        <img src={book.image} className='img-book' />
                                                                    </span>
                                                                    <IonCardContent className='CardContent'>
                                                                        <IonCardTitle className='title'>{book.name}</IonCardTitle>
                                                                    </IonCardContent>
                                                                </IonCard>
                                                            </IonRouterLink>
                                                        </SwiperSlide>

                                                    </>
                                                )
                                            })}

                                        </Swiper>
                                    </div>

                                    <div className='Catagory'>
                                        <IonLabel className='name_catagory'>???????????????</IonLabel>
                                        <IonRouterLink href="/Booklist/???????????????" >
                                            <IonLabel className='viewall' href="/booklist">???????????????????????????</IonLabel>
                                        </IonRouterLink>
                                        <Swiper
                                            sspaceBetween={0}
                                            slidesPerView={3.5} >
                                            {data.filter(cate => cate.category == '???????????????').filter((_, idx) => (idx < 4)).map((book, index) => {

                                                return (
                                                    <>
                                                        <SwiperSlide className='Slide-book' >
                                                            <IonRouterLink href={"/DetailBook/" + book._id} >
                                                                <IonCard
                                                                    className='Card-book'
                                                                    onClick={() => doPlay}>
                                                                    <span className='image-b'>
                                                                        <img src={book.image} className='img-book' />
                                                                    </span>
                                                                    <IonCardContent className='CardContent'>
                                                                        <IonCardTitle className='title'>{book.name}</IonCardTitle>
                                                                    </IonCardContent>
                                                                </IonCard>
                                                            </IonRouterLink>
                                                        </SwiperSlide>

                                                    </>
                                                )
                                            })}

                                        </Swiper>
                                    </div>

                                    <div className='Catagory-even'>
                                        <IonLabel className='name_catagory'>???????????????</IonLabel>
                                        <IonRouterLink href="/Booklist/???????????????" >
                                            <IonLabel className='viewall' href="/booklist">???????????????????????????</IonLabel>
                                        </IonRouterLink>
                                        <Swiper
                                            sspaceBetween={0}
                                            slidesPerView={3.5} >
                                            {data.filter(cate => cate.category == '???????????????').filter((_, idx) => (idx < 4)).map((book, index) => {

                                                return (
                                                    <>
                                                        <SwiperSlide className='Slide-book' >
                                                            <IonRouterLink href={"/DetailBook/" + book._id} >
                                                                <IonCard
                                                                    className='Card-book'
                                                                    onClick={() => doPlay}>
                                                                    <span className='image-b'>
                                                                        <img src={book.image} className='img-book' />
                                                                    </span>
                                                                    <IonCardContent className='CardContent'>
                                                                        <IonCardTitle className='title'>{book.name}</IonCardTitle>
                                                                    </IonCardContent>
                                                                </IonCard>
                                                            </IonRouterLink>
                                                        </SwiperSlide>

                                                    </>
                                                )
                                            })}

                                        </Swiper>
                                    </div>

                                    <div className='Catagory'>
                                        <IonLabel className='name_catagory'>??????????????????</IonLabel>
                                        <IonRouterLink href="/Booklist/??????????????????" >
                                            <IonLabel className='viewall' href="/booklist">???????????????????????????</IonLabel>
                                        </IonRouterLink>
                                        <Swiper
                                            sspaceBetween={0}
                                            slidesPerView={3.5} >
                                            {data.filter(cate => cate.category == '??????????????????').filter((_, idx) => (idx < 4)).map((book, index) => {

                                                return (
                                                    <>
                                                        <SwiperSlide className='Slide-book' >
                                                            <IonRouterLink href={"/DetailBook/" + book._id} >
                                                                <IonCard
                                                                    className='Card-book'
                                                                    onClick={() => doPlay}>
                                                                    <span className='image-b'>
                                                                        <img src={book.image} className='img-book' />
                                                                    </span>
                                                                    <IonCardContent className='CardContent'>
                                                                        <IonCardTitle className='title'>{book.name}</IonCardTitle>
                                                                    </IonCardContent>
                                                                </IonCard>
                                                            </IonRouterLink>
                                                        </SwiperSlide>

                                                    </>
                                                )
                                            })}

                                        </Swiper>
                                    </div>

                                    <div className='Catagory-even'>
                                        <IonLabel className='name_catagory'>??????????????????</IonLabel>
                                        <IonRouterLink href="/Booklist/??????????????????" >
                                            <IonLabel className='viewall' href="/booklist">???????????????????????????</IonLabel>
                                        </IonRouterLink>
                                        <Swiper
                                            sspaceBetween={0}
                                            slidesPerView={3.5} >
                                            {data.filter(cate => cate.category == '??????????????????').filter((_, idx) => (idx < 4)).map((book, index) => {

                                                return (
                                                    <>
                                                        <SwiperSlide className='Slide-book' >
                                                            <IonRouterLink href={"/DetailBook/" + book._id} >
                                                                <IonCard
                                                                    className='Card-book'
                                                                    onClick={() => doPlay}>
                                                                    <span className='image-b'>
                                                                        <img src={book.image} className='img-book' />
                                                                    </span>
                                                                    <IonCardContent className='CardContent'>
                                                                        <IonCardTitle className='title'>{book.name}</IonCardTitle>
                                                                    </IonCardContent>
                                                                </IonCard>
                                                            </IonRouterLink>
                                                        </SwiperSlide>

                                                    </>
                                                )
                                            })}

                                        </Swiper>
                                    </div>

                                    <div className='Catagory'>
                                        <IonLabel className='name_catagory'>????????????????????????</IonLabel>
                                        <IonRouterLink href="/Booklist/????????????????????????" >
                                            <IonLabel className='viewall' href="/booklist">???????????????????????????</IonLabel>
                                        </IonRouterLink>
                                        <Swiper
                                            sspaceBetween={0}
                                            slidesPerView={3.5} >
                                            {data.filter(cate => cate.category == '????????????????????????').filter((_, idx) => (idx < 4)).map((book, index) => {

                                                return (
                                                    <>
                                                        <SwiperSlide className='Slide-book' >
                                                            <IonRouterLink href={"/DetailBook/" + book._id} >
                                                                <IonCard
                                                                    className='Card-book'
                                                                    onClick={() => doPlay}>
                                                                    <span className='image-b'>
                                                                        <img src={book.image} className='img-book' />
                                                                    </span>
                                                                    <IonCardContent className='CardContent'>
                                                                        <IonCardTitle className='title'>{book.name}</IonCardTitle>
                                                                    </IonCardContent>
                                                                </IonCard>
                                                            </IonRouterLink>
                                                        </SwiperSlide>

                                                    </>
                                                )
                                            })}

                                        </Swiper>
                                    </div>

                                    <div className='Catagory-even'>
                                        <IonLabel className='name_catagory'>??????????????????</IonLabel>
                                        <IonRouterLink href="/Booklist/??????????????????" >
                                            <IonLabel className='viewall' href="/booklist">???????????????????????????</IonLabel>
                                        </IonRouterLink>
                                        <Swiper
                                            sspaceBetween={0}
                                            slidesPerView={3.5} >
                                            {data.filter(cate => cate.category == '??????????????????').filter((_, idx) => (idx < 4)).map((book, index) => {

                                                return (
                                                    <>
                                                        <SwiperSlide className='Slide-book' >
                                                            <IonRouterLink href={"/DetailBook/" + book._id} >
                                                                <IonCard
                                                                    className='Card-book'
                                                                    onClick={() => doPlay}>
                                                                    <span className='image-b'>
                                                                        <img src={book.image} className='img-book' />
                                                                    </span>
                                                                    <IonCardContent className='CardContent'>
                                                                        <IonCardTitle className='title'>{book.name}</IonCardTitle>
                                                                    </IonCardContent>
                                                                </IonCard>
                                                            </IonRouterLink>
                                                        </SwiperSlide>

                                                    </>
                                                )
                                            })}

                                        </Swiper>
                                    </div>
                                    <IonSlides pager={true} options={slideOpts}>
                                        <IonSlide>

                                        </IonSlide>

                                    </IonSlides>

                                </IonContent>
                            </IonPage>
                        </>
                }
            </>

        );
    } else {
        return (
            <>
                {
                    loading ?
                        <div>loading...</div>
                        :
                        <>
                            <IonPage className="BlindHOMEPage">
                                <IonContent fullscreen >
                                    <div className="bar">
                                        <IonLabel >GARZIP</IonLabel>
                                    </div>
                                    {/* <a href="/login">login</a> */}


                                    <IonItem className="item-list-Blind">

                                        <IonLabel className="title-category">

                                            <IonRouterLink href="/Booklist/??????????????????" >
                                                <IonLabel className='title-category-Blind'> ?????????????????? </IonLabel>
                                            </IonRouterLink>
                                            <IonRouterLink href="/Booklist/?????????????????????" >
                                                <IonLabel className='title-category-Blind'> ????????????????????? </IonLabel>
                                            </IonRouterLink>
                                            <IonRouterLink href="/Booklist/??????????????????????????????" >
                                                <IonLabel className='title-category-Blind'> ???????????????????????????????????????????????? </IonLabel>
                                            </IonRouterLink>



                                            <IonRouterLink href="/Booklist/???????????????" >
                                                <IonLabel className='title-category-Blind'> ??????????????? </IonLabel>
                                            </IonRouterLink>
                                            <IonRouterLink href="/Booklist/??????????????????" >
                                                <IonLabel className='title-category-Blind'> ??????????????????  </IonLabel>
                                            </IonRouterLink>
                                            <IonRouterLink href="/Booklist/???????????????" >
                                                <IonLabel className='title-category-Blind'> ??????????????? </IonLabel>
                                            </IonRouterLink>
                                            <IonRouterLink href="/Booklist???????????????" >
                                                <IonLabel className='title-category-Blind'> ??????????????? </IonLabel>
                                            </IonRouterLink>
                                            <IonRouterLink href="/Booklist/??????????????????" >
                                                <IonLabel className='title-category-Blind'> ?????????????????? </IonLabel>
                                            </IonRouterLink>
                                            <IonRouterLink href="/Booklist/??????????????????" >
                                                <IonLabel className='title-category-Blind'> ?????????????????? </IonLabel>
                                            </IonRouterLink>
                                            <IonRouterLink href="/Booklist/???????????????????????? " >
                                                <IonLabel className='title-category-Blind'> ???????????????????????? </IonLabel>
                                            </IonRouterLink>
                                            <IonRouterLink href="/Booklist/??????????????????" >
                                                <IonLabel className='title-category-Blind'> ?????????????????? </IonLabel>
                                            </IonRouterLink>

                                        </IonLabel>
                                    </IonItem>
                                    {/* {moment(book.create_date).format("MMM DD YYYY hh:mm:ss")} */}

                                </IonContent>
                            </IonPage>
                        </>
                }
            </>

        );
    }


};

export default Home;

{/* {data.filter(cate => cate.category == '???????????????').map(book => {
                            return(
                                <>
                                    <IonGrid>
                                        <h1> name : {book.name}</h1>
                                    </IonGrid>
                                    
                                </>
                            )
                        })} */}