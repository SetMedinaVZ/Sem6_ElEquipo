import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

const Container = styled.div`
  width: 90%;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  height: 200px;
  /* background: linear-gradient(180deg, #f85a46 0%, rgba(222, 43, 39, 0) 100%); */
  background: ${(props) => props.background};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px;
  margin: 10px 0;
`;

const QuestNum = styled.span`
  font-family: "Inter";
  font-weight: 900;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
`;

const ContentText = styled.span`
  padding: 0 10px;
  width: 100%;
  font-family: "Inter";
  font-weight: 600;
  font-size: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
`;

const Carousel = (props) => {
  const { currentUser } = useAuth();
  const [completedQuests, setCompletedQuests] = useState(0);
  const [totalQuests, setTotalQuests] = useState(0);
  // console.log(props.data);
  const getQuestsCount = async () => {
    const userPurchaseHistoryRef = collection(
      firestore,
      "users",
      currentUser.uid,
      "quests"
    );
    const userPurchaseHistoryQuery = query(userPurchaseHistoryRef);
    const userPurchaseHistorySnapshot = await getDocs(userPurchaseHistoryQuery);
    let completedQuests = 0;
    let totalQuests = 0;
    userPurchaseHistorySnapshot.docs.forEach((doc) => {
      let data = doc.data();
      console.log(data);
      for (let i = 1; i <= data.actCount; i++) {
        let acts = "act";
        let str = acts + i;
        if (data[str].completed) {
          completedQuests = completedQuests + 1;
        }
      }
      totalQuests = totalQuests + data.actCount;
    });
    setTotalQuests(totalQuests);
    setCompletedQuests(completedQuests);
  };

  useEffect(() => {
    getQuestsCount();
  }, []);

  return (
    <Container>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <Content background="linear-gradient(180deg, #f85a46 0%, rgba(222, 43, 39, 0) 100%)">
            <QuestNum>
              {completedQuests}/{totalQuests}
            </QuestNum>
            <ContentText>Quests completados esta semana</ContentText>
          </Content>
        </SwiperSlide>
        {props.data.map((item) => {
          return (
            <SwiperSlide key={item.message}>
              <Content background={item.color}>
                <ContentText>{item.message}</ContentText>
              </Content>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
};

export default Carousel;
