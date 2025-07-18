export const googleanalytics = () => {

    const trackButtonClick = (eventType: string, categoryString: string,labelString: string ) => {
        // if (window.gtag) {
        //     window.gtag('event', `${eventType}`, {
        //         event_category: `${categoryString}`,
        //         event_label: `${labelString}`,

        //         page_title: document.title,
        //         page_path: window.location.pathname,
        //         device_type: window.innerWidth <= 768 ? 'mobile' : 'desktop'
        //     });
        // }
    };



    return {
        trackButtonClick
    };
}