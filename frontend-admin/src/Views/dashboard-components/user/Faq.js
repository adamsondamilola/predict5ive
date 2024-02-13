
import React, { Component, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import TitleBanner from '../../layout-components/TitleBanner';
import ConvertToRate from '../../../Utilities/ConvertToRate';
import TitleSection from '../../layout-components/TitleSection';
import { Link } from 'react-router-dom';
import PredictionsDashboard from './Predictions';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../../../Utilities/Loading';

const Faqs = () => {

    const [faqList, setFaqList] = useState([]);
    const getFAQ = () => {
      
        fetch(process.env.REACT_APP_MAIN_API +'settings/faq')
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 1) {
                    var x = json.message;
                    setFaqList(x)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => console.log(""));
    }
  
    const [selectedId, setSelectId] = useState(1);

function selectQuestion(id){
    setSelectId(id)
}
    useEffect(()=>{
        getFAQ()
    },[])

    const Images = [
        {title: "Image 1", url: "/files/sportsads-1.jpg"},
        {title: "Image 2", url: "/files/sports_ads_no_ref.jpg"},
        {title: "Image 3", url: "/files/sports_vendor.jpg"},
        {title: "Image 4", url: "/files/thumbnail.jpg"},
    ]

return(
    <div className='container'>
      <div className='row mt-2'>

      <TitleSection title="Presentation/FAQ" />
     


                                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <div className='table-responsive'>
                                            <table className='table'>
                                                <thead>
                                                    <tr>
                                                    <td colSpan={2}>Presentation</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>PDF</td>
                                                    <td> <Link to='/file/Shortrich_doc.pdf' target='_blank' download> <i className='fa fa-file'></i> Download</Link></td>
                                                    </tr>
                                                    {Images.map(x =>
                                                     <tr>
                                                    <td>{x.title}</td>
                                                    <td> <Link to={x.url} target='_blank' download> <i className='fa fa-picture'></i> Download</Link></td>
                                                    </tr>
                                                    )}
                                                    
                                                </tbody>

                                                <thead>
                                                    <tr>
                                                    <td colSpan={2}>Frequently Asked Questions</td>
                                                    </tr>
                                                </thead>
                                            </table>

                                            {faqList.map(x =>
                <div onClick={() => selectQuestion(x.id)} class="card col">
                   
                        <h6 class="font-weight-bold m-3">{x.question}</h6>
                   
                    <div style={{display: selectedId == x.id? `block` : `none` }}>
                        <div className='col-12 m-3'>
                        <div dangerouslySetInnerHTML={{ __html: x.answer }} />
                        </div>
                    </div>
                </div>
                )}
                                        </div>
                                    </div>
      </div>

      <ToastContainer />
</div>
)
}
export default Faqs