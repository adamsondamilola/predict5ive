import React, { Component } from 'react'; 

const TitleBanner = (props) => {
return <>
<section class="elementor-section elementor-top-section elementor-element elementor-element-7880ce39 elementor-section-height-min-height elementor-reverse-tablet elementor-reverse-mobile elementor-section-boxed elementor-section-height-default elementor-section-items-middle" data-id="7880ce39" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;gradient&quot;,&quot;shape_divider_bottom&quot;:&quot;curve&quot;,&quot;shape_divider_bottom_negative&quot;:&quot;yes&quot;}">
    <div class="elementor-background-overlay"></div>
    <div class="elementor-shape elementor-shape-bottom" data-negative="true">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
    <path class="elementor-shape-fill" d="M500,97C126.7,96.3,0.8,19.8,0,0v100l1000,0V1C1000,19.4,873.3,97.8,500,97z"></path>
    </svg> </div>
    <div class="elementor-container elementor-column-gap-default">
    <div class="elementor-row">
    <div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-7d6fffe8" data-id="7d6fffe8" data-element_type="column">
    <div class="elementor-column-wrap elementor-element-populated">
    <div class="elementor-widget-wrap">
    <div class="elementor-element elementor-element-6cf807ec elementor-widget elementor-widget-heading animated fadeInUp" data-id="6cf807ec" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;}" data-widget_type="heading.default">
    <div class="elementor-widget-container">
    <h4 class="elementor-heading-title elementor-size-default">{props.Title}</h4> </div>
    </div>
    <div class="elementor-element elementor-element-56378eca elementor-widget elementor-widget-text-editor animated fadeInUp" data-id="56378eca" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:200}" data-widget_type="text-editor.default">
    <div class="elementor-widget-container">
    <div class="elementor-text-editor elementor-clearfix">
    <p>{props.Info}</p> </div>
    </div>
    </div>
     </div>
    </div>
    </div>
    <div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-4366e527" data-id="4366e527" data-element_type="column">
    <div class="elementor-column-wrap elementor-element-populated">
    <div class="elementor-widget-wrap">
    <div class="elementor-element elementor-element-32ec2214 elementor-widget__width-initial elementor-absolute elementor-widget elementor-widget-spacer" data-id="32ec2214" data-element_type="widget" data-settings="{&quot;_position&quot;:&quot;absolute&quot;}" data-widget_type="spacer.default">
    <div class="elementor-widget-container">
    <div class="elementor-spacer">
    <div class="elementor-spacer-inner"></div>
    </div>
    </div>
    </div>
    <div class="elementor-element elementor-element-6439a1e1 elementor-widget__width-initial elementor-absolute elementor-widget elementor-widget-spacer" data-id="6439a1e1" data-element_type="widget" data-settings="{&quot;_position&quot;:&quot;absolute&quot;}" data-widget_type="spacer.default">
    <div class="elementor-widget-container">
    <div class="elementor-spacer">
    <div class="elementor-spacer-inner"></div>
    </div>
    </div>
    </div>
    <div class="elementor-element elementor-element-5433e298 elementor-widget__width-initial elementor-absolute elementor-widget elementor-widget-spacer" data-id="5433e298" data-element_type="widget" data-settings="{&quot;_position&quot;:&quot;absolute&quot;}" data-widget_type="spacer.default">
    <div class="elementor-widget-container">
    <div class="elementor-spacer">
    <div class="elementor-spacer-inner"></div>
    </div>
    </div>
    </div>
    <div class="elementor-element elementor-element-d3cae62 elementor-widget elementor-widget-image animated fadeIn" data-id="d3cae62" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeIn&quot;}" data-widget_type="image.default">
    <div class="elementor-widget-container">
    <div class="elementor-image">
 </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>
    
</>
}
export default TitleBanner