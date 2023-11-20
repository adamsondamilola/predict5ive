
import TitleBanner from '../layout-components/TitleBanner';
import React, { Component, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { Link, useParams } from 'react-router-dom';
import TruncatePost from '../../Utilities/TruncatePost';

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const getPosts = () => {      
        fetch(process.env.REACT_APP_MAIN_API +'post/get_posts')
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 1) {
                    var x = json.message;
                    setPosts(x)
                }else{
                    {toast.error(json.message)}
                }
            })
            .catch((error) => console.error(error))
            .finally(() => console.log(""));
    }
  
    useEffect(()=>{
        getPosts()
    },[])
 
return(
    <>
    <TitleBanner Title="Posts" Info="Remember to always share after viewing new post."/>
    <section class="elementor-section elementor-top-section elementor-element elementor-element-194549b9 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="194549b9" data-element_type="section">
<div class="elementor-container elementor-column-gap-default">
<div class="elementor-row">
<div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-40774220" data-id="40774220" data-element_type="column">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-widget-wrap">
<div class="elementor-element elementor-element-6a0b1153 elementor-widget elementor-widget-heading animated fadeInUp" data-id="6a0b1153" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;}" data-widget_type="heading.default">
<div class="elementor-widget-container">
<h2 class="elementor-heading-title elementor-size-default">Learn &amp; Earn with our Blog</h2> </div>
</div>
<div class="elementor-element elementor-element-5b0048c5 elementor-grid-2 elementor-grid-tablet-2 elementor-grid-mobile-1 elementor-posts--thumbnail-top elementor-widget elementor-widget-posts animated fadeInUp" data-id="5b0048c5" data-element_type="widget" data-settings="{&quot;classic_columns&quot;:&quot;2&quot;,&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;classic_columns_tablet&quot;:&quot;2&quot;,&quot;classic_columns_mobile&quot;:&quot;1&quot;,&quot;classic_row_gap&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:35,&quot;sizes&quot;:[]},&quot;classic_row_gap_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;classic_row_gap_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]}}" data-widget_type="posts.classic">
<div class="elementor-widget-container">
<div class="elementor-posts-container elementor-posts elementor-posts--skin-classic elementor-grid elementor-has-item-ratio">

{posts.map(x =>
<article class="elementor-post elementor-grid-item post-781 post type-post status-publish format-standard has-post-thumbnail hentry category-uncategorized">
<a class="elementor-post__thumbnail__link" href="#">
<div class="elementor-post__thumbnail"><img width="800" height="534" src={x.post_image} class="attachment-large size-large wp-image-782" alt="Soccer Player Scoring A Goal At Field" loading="lazy" /></div>
</a>
<div class="elementor-post__text">
<h3 class="elementor-post__title">
<a href="#">
{x.post_title} </a>
</h3>
 <div class="elementor-post__meta-data">
<span class="elementor-post-date">
{x.post_date} </span>
<span class="elementor-post-avatar">
Clicks ({x.clicks}) </span>
</div>
<div class="elementor-post__excerpt">
<div dangerouslySetInnerHTML={{ __html: TruncatePost(x.post_content) }} />
</div>
<Link class="elementor-post__read-more" to={"/"+x.id+"/post"} aria-label="Read more about Battle of the Odds, which is the best option?">
Read More » </Link>
</div>
</article>
)}
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<ToastContainer />
    </>
)
}
export default Posts