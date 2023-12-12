
import React, { useState }  from 'react'
import ContentWrapper from '../../../allcomponents/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../allcomponents/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../allcomponents/carousel/Carousel';


const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/popular`);

  const onTabChange = (tab) => {
      setEndpoint(tab === "Movies" ? "movie" : "tv");
  };
    
  return (
      <div className="carouselSection">
          <ContentWrapper>
              <span className="carouselTitle">What's Popular</span>
              <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange} />
          </ContentWrapper>
          <Carousel  endpoint={endpoint} data={data?.results} loading={loading} />
      </div>
  );
};

export default Popular;